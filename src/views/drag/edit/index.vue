<template>
    <div v-if="initSon" class="app">
        <el-header height="60px" :style="{'padding':0}">
            <Header
                :activity-data="activityData"
                @importJsonData="importJsonData"
                @saveActivity="saveActivity"
                @toPreview="toPreview"
            />
        </el-header>
        <el-container class="app-container">
            <LeftAside
                ref="leftAside"
                :activity-data.sync="activityData"
                :cur-page-data.sync="curPageData"
                :aside-is-open.sync="editInfo.asideIsOpen"
                @setEditInfoToLocal="setEditInfoToLocal"
            />
            <Edit
                ref="edit"
                :cur-page-data.sync="curPageData"
                :editing-component.sync="editingComponent"
                :element-clip-board.sync="elementClipBoard"
                :cur-view-type.sync="editInfo.viewType"
                :mobile-view-scale.sync="editInfo.mobileViewScale"
                @setEditInfoToLocal="setEditInfoToLocal"
                @saveActivity="saveActivity"
            />
            <RightAside
                ref="rightAside"
                :activity-data="activityData"
                :cur-page-data.sync="curPageData"
                :editing-component.sync="editingComponent"
            />
        </el-container>
    </div>
</template>
<script>
import LeftAside from "./wrapper/LeftAside";
import RightAside from "./wrapper/RightAside";
import Header from "./wrapper/Header";
import Edit from "./wrapper/Edit";
import { activity as activityConfig } from "@/config/json_scheme";
import { deepClone } from "@/utils";
import { getActivityDetail, addActivityDetail, editActivityDetail } from "@/api/drag";
import { setConfigMap, removeConfigMap } from "../common/handlerData";
import { mapGetters } from "vuex";
export default {
    components: {
        LeftAside,
        RightAside,
        Edit,
        Header
    },
    computed: {
        ...mapGetters(["allForm", "userInfo"])
    },
    data() {
        return {
            activityId: "-1",
            initSon: false,
            activityData: {},
            curPageData: {},
            editingComponent: {}, // 当前操作中组件
            elementClipBoard: {}, // 粘贴板
            editInfo: {
                viewType: "IPHONE6/7/8",
                mobileViewScale: 1,
                asideIsOpen: true
            }
        };
    },
    watch: {
        "curPageData.uuid": function() {
            this.editingComponent = {};
        }
    },
    methods: {
        async initData() {
            const { query: { id }} = this.$route;
            this.activityId = id;
            let activityData = null;
            let loading = null;
            const localData = localStorage.getItem("localData");
            if (localData) {
                this.activityData = JSON.parse(localData);
                this.initSon = true;
                localStorage.removeItem("localData");
                return;
            }
            if (id !== "-1") {
                loading = this.$loading({
                    lock: true,
                    text: "Loading",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.3)"
                });
                const res = await getActivityDetail(id);
                activityData = res && res.jsonData;
            }
            if (activityData) {
                this.activityData = setConfigMap(JSON.parse(activityData));
            } else {
                this.activityData = deepClone(activityConfig);
                this.activityData.author = this.userInfo.userName;
                this.activityData.authorId = this.userInfo.id;
            }
            this.initSon = true;
            loading && loading.close();
        },
        importJsonData(jsonData) {
            this.activityData = deepClone(jsonData);
            this.activityData.author = this.userInfo.userName;
            this.activityData.authorId = this.userInfo.id;
            localStorage.setItem("localData", JSON.stringify(this.activityData));
            location.reload();
        },
        async validAllForm() {
            const handler = (validate, errMessage, key) => {
                return new Promise(resolve => {
                    validate(valid => {
                        if (valid) {
                            resolve({
                                success: true
                            });
                        } else {
                            resolve({
                                success: false,
                                errMessage,
                                key
                            });
                        }
                    });
                });
            };
            const validateArr = [];
            this.allForm.forEach(async ({ validate, errMessage, key }) => {
                validateArr.push(handler(validate, errMessage, key));
            });
            const resultArr = await Promise.all(validateArr);
            const err = resultArr.filter(i => !i.success) || [];
            if (err.length) {
                this.$message.error(err[0].errMessage);
                this.$refs.rightAside.curEditType = err[0].key;
                return false;
            }
            return true;
        },
        async saveActivity() {
            if (!await this.validAllForm()) return false;
            const { title, author, authorId, description, coverImage } = this.activityData;
            if (this.userInfo.id !== this.activityData.authorId) return this.$message.warning("暂不支持修改他人的活动，可以尝试导入导出功能");
            const saveActivityData = removeConfigMap(deepClone(this.activityData));
            const jsonData = JSON.stringify(saveActivityData);
            console.log(`当前活动 jsonData 长度为 ${jsonData.length}`);
            const data = {
                id: this.activityId,
                title,
                author,
                authorId,
                description,
                coverImage,
                jsonData
            };
            if (!this.activityId || this.activityId === "-1") {
                data.id && delete data.id;
                const res = await addActivityDetail(data);
                this.activityId = res.id;
                this.$message.success("保存成功");
                this.$router.push({
                    name: "dragList"
                });
                return true;
            } else {
                const res = await editActivityDetail(data);
                this.activityId = res.id;
                this.$message.success("修改成功");
                return true;
            }
        },
        async toPreview() {
            const saveRes = await this.saveActivity();
            if (!saveRes) return;
            const url = `${location.origin}/view?id=${this.activityId}`;
            window.open(url, "_blank");
        },
        setEditInfoToLocal() {
            const key = "NJ_EDIT_INFO";
            const editInfo = {
                ...this.getEditInfoFromLocal(),
                ...this.editInfo
            };
            localStorage.setItem(key, JSON.stringify(editInfo));
        },
        getEditInfoFromLocal(setEdit) {
            const key = "NJ_EDIT_INFO";
            const editInfoStr = localStorage.getItem(key);
            if (!editInfoStr) return {};
            const editInfo = JSON.parse(editInfoStr);
            if (!setEdit) return editInfo;
            this.editInfo = {
                ...this.editInfo,
                ...editInfo
            };
        }
    },
    created() {
        this.initData();
        this.getEditInfoFromLocal(true);
    }
};
</script>

<style lang="scss">
.app{
    height: 100%;
}
.app-container{
    width: 100%;
    height: calc(100% - 60px);
}
.custom-context-menu{
    position: fixed;
    z-index: 10000;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #eee;
    padding: 0;
    >li{
        cursor: pointer;
        &:hover{
            background-color: #eee;
        }
    }
}
</style>

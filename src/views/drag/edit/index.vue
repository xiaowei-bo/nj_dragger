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
            />
            <Edit
                ref="edit"
                :cur-page-data.sync="curPageData"
                :editing-component.sync="editingComponent"
                :element-clip-board.sync="elementClipBoard"
            />
            <RightAside
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
export default {
    components: {
        LeftAside,
        RightAside,
        Edit,
        Header
    },
    data() {
        return {
            activityId: "-1",
            initSon: false,
            activityData: {},
            curPageData: {},
            editingComponent: {}, // 当前操作中组件
            elementClipBoard: {} // 粘贴板
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
                this.activityData.author = "yibo.wei";
            }
            this.initSon = true;
            loading && loading.close();
        },
        importJsonData(jsonData) {
            this.activityData = deepClone(jsonData);
            this.activityData.author = "yibo.wei";
            localStorage.setItem("localData", JSON.stringify(this.activityData));
            location.reload();
        },
        async saveActivity() {
            const { title, author, description, coverImage } = this.activityData;
            const saveActivityData = removeConfigMap(deepClone(this.activityData));
            const jsonData = JSON.stringify(saveActivityData);
            console.log(`当前活动 jsonData 长度为 ${jsonData.length}`);
            const data = {
                id: this.activityId,
                title,
                author,
                description,
                coverImage,
                jsonData
            };
            if (!this.activityId || this.activityId === "-1") {
                data.id && delete data.id;
                const res = await addActivityDetail(data);
                this.activityId = res.id;
                this.$message.success("保存成功");
            } else {
                const res = await editActivityDetail(data);
                this.activityId = res.id;
                this.$message.success("修改成功");
            }
        },
        async toPreview() {
            await this.saveActivity();
            const url = `${location.origin}/view?id=${this.activityId}`;
            window.open(url, "_blank");
        }
    },
    created() {
        this.initData();
    }
};
</script>

<style lang="scss" scoped>
.app{
    height: 100%;
}
.app-container{
    width: 100%;
    height: calc(100% - 60px);
}
</style>

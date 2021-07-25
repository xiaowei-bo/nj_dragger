<template>
    <div class="app-header clearfix">
        <div class="header-left fl"></div>
        <div class="header-middle fl">
            <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
                <i class="iconfont icon-yulan" @click="$emit('toPreview')"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出JSON" placement="bottom">
                <i class="iconfont icon-daochu" @click="exportJson"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导入JSON" placement="bottom">
                <i class="iconfont icon-daoru1" @click="importJson"></i>
            </el-tooltip>
            <el-button class="fr" type="primary" size="mini" @click="$emit('saveActivity')">保存</el-button>
        </div>
        <div class="header-right fl"></div>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose"
        >
            <VueJsonPretty
                v-if="dialogStatus === 'export'"
                selectable-type="multiple"
                :data="content"
                :deep="2"
                :show-length="true"
                :highlight-mouseover-node="true"
                highlight-selected-node
            />
            <el-input
                v-if="dialogStatus === 'import'"
                v-model="importData"
                :autosize="{ minRows: 4 }"
                type="textarea"
                placeholder="请将已有的json数据粘贴于此"
            />
            <span slot="footer" class="dialog-footer">
                <el-button v-if="dialogStatus === 'export'" type="primary" @click="handlerClip">复 制</el-button>
                <el-button type="primary" @click="handlerSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { copyText } from "@/utils";
export default {
    components: { VueJsonPretty },
    props: {
        activityData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            dialogVisible: false,
            dialogStatus: "export",
            content: "",
            importData: ""
        };
    },
    computed: {
        dialogTitle() {
            const titleMap = {
                "import": "导入数据",
                "export": "导出数据"
            };
            return titleMap[this.dialogStatus];
        }
    },
    methods: {
        exportJson() {
            this.dialogStatus = "export";
            this.content = this.activityData;
            this.dialogVisible = true;
        },
        importJson() {
            this.dialogStatus = "import";
            this.dialogVisible = true;
        },
        handlerSure() {
            if (this.dialogStatus === "export") {
                this.dialogVisible = false;
                return;
            } else if (this.dialogStatus === "import") {
                const importData = this.importData ? JSON.parse(this.importData) : "";
                this.$emit("importJsonData", importData);
                this.dialogVisible = false;
                return;
            }
        },
        handlerClip() {
            console.log(JSON.stringify(this.activityData).length);
            copyText(JSON.stringify(this.activityData));
        },
        handleClose() {
            this.dialogVisible = false;
        }
    },
    created() {

    }
};
</script>

<style lang="scss" scoped>
.app-header{
    width: 100%;
    border-bottom: 1px solid #dcdfe6;
    .header-left{
        width: 280px;
        height: 60px;
    }
    .header-middle{
        width: calc(100% - 660px);
        height: 60px;
        padding: 20px 20px 0;
        box-sizing: border-box;
        .iconfont{
            display: inline-block;
            margin-right: 50px;
            cursor: pointer;
        }
        .el-button{
            position: relative;
            top: -5px;
        }
    }
    .header-right{
        width: 380px;
        height: 60px;
    }
}
</style>

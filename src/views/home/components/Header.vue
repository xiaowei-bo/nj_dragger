<template>
    <div class="app-header clearfix">
        <div class="header-left fl"></div>
        <div class="header-middle fl">
            <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
                <i class="iconfont icon-yulan"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出JSON" placement="bottom">
                <i class="iconfont icon-daochu" @click="importJson"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导入JSON" placement="bottom">
                <i class="iconfont icon-daoru1"></i>
            </el-tooltip>
        </div>
        <div class="header-right fl"></div>
        <el-dialog
            title="activityData 内容"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose"
        >
            <VueJsonPretty
                selectable-type="multiple"
                :data="content"
                :deep="2"
                :show-length="true"
                :highlight-mouseover-node="true"
                highlight-selected-node
            />
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
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
            content: ""
        };
    },
    methods: {
        importJson() {
            this.content = this.activityData;
            this.dialogVisible = true;
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
        padding: 30px 20px 0;
        .iconfont{
            display: inline-block;
            margin-right: 50px;
            cursor: pointer;
        }
    }
    .header-right{
        width: 380px;
        height: 60px;
    }
}
</style>

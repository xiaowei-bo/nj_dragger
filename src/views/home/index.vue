<template>
    <div class="app">
        <el-header height="60px" :style="{'padding':0}">
            <Header
                :activity-data="activityData"
                @importJsonData="importJsonData"
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
                :focus-edit-page.sync="focusEditPage"
            />
            <RightAside
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
export default {
    components: {
        LeftAside,
        RightAside,
        Edit,
        Header
    },
    data() {
        return {
            activityData: {},
            curPageData: {},
            editingComponent: {}, // 当前操作中组件
            elementClipBoard: {}, // 粘贴板
            focusEditPage: false
        };
    },
    methods: {
        initData() {
            this.activityData = deepClone(activityConfig);
        },
        importJsonData(jsonData) {
            this.activityData = deepClone(jsonData);
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

<template>
    <div class="app">
        <el-header height="60px">
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
import LeftAside from "./components/LeftAside.vue";
import RightAside from "./components/RightAside.vue";
import Header from "./components/Header.vue";
import Edit from "./components/Edit.vue";
import { activity as activityConfig } from "@/config/json_scheme.js";
import { deepClone } from "@/utils/index.js";
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

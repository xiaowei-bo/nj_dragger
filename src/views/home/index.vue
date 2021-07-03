<template>
    <div class="app">
        <el-header class="app-header" height="80px">
            Header
        </el-header>
        <el-container class="app-container">
            <LeftAside />
            <Edit
                :cur-page-data.sync="curPageData"
                :editing-component.sync="editingComponent"
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
import Edit from "./components/Edit.vue";
export default {
    components: {
        LeftAside,
        RightAside,
        Edit
    },
    data() {
        return {
            activityData: {
                pages: []
            },
            curPageData: {
                name: "",
	            elements: [],// 页面元素
	            commonStyle: {
	            	backgroundColor: "",
	            	backgroundImage: "",
	            	backgroundSize: "cover"
	            }
            },
            editingComponent: {}
        };
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
.app{
    height: 100%;
}
.app-header{
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid #dcdfe6;
    // box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}
.app-container{
    width: 100%;
    height: calc(100% - 80px);
}
</style>

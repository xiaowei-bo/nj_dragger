<template>
    <el-aside class="app-right-aside clearfix" width="400px">
        <el-tabs
            v-model="curEditType"
            :stretch="true"
            @tab-click="chengeCurEditType"
        >
            <el-tab-pane label="组件配置" name="editingComponent">
                <ComponentConfig :editing-component="editingComponent" />
            </el-tab-pane>
            <el-tab-pane label="页面配置" name="second">页面配置</el-tab-pane>
            <el-tab-pane label="活动配置" name="third">活动配置</el-tab-pane>
        </el-tabs>
    </el-aside>
</template>

<script>
import ComponentConfig from "./components/ComponentConfig/index.vue";
export default {
    components: {
        ComponentConfig
    },
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            curEditType: "editingComponent",
            editTypeMap: [{
                title: "组件基础配置",
                name: "baseConfig",
                component: "ConfigForm"
            }, {
                title: "样式基础配置",
                name: "styleConfig",
                component: "StyleForm"
            }]
        };
    },
    methods: {
        chengeCurEditType(i) {
            console.log(i);
        }
    }
};
</script>

<style lang="scss" scoped>
.app-right-aside{
    width: 400px;
    height: 100%;
    border-left: 1px solid #dcdfe6;
    box-sizing: border-box;
}
</style>

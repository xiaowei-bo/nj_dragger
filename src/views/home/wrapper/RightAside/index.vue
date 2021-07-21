<template>
    <el-aside class="app-right-aside clearfix" width="400px">
        <div v-show="noEditComponent">
            暂无操作信息
        </div>
        <div v-show="!noEditComponent">
            <el-collapse 
                v-model="curEditType" 
                @change="chengeCurEditType"
            >
                <el-collapse-item
                    v-for="({ title, name, component }, index) in editTypeMap"
                    class="el-collapse-item"
                    :key="index"
                    :title="title"
                    :name="name"
                >
                    <component :is="component" :editing-component="editingComponent" />
                </el-collapse-item>
            </el-collapse>
        </div>
    </el-aside>
</template>

<script>
import ConfigForm from "./components/ConfigForm.vue";
import StyleForm from "./components/StyleForm.vue";
export default {
    components: {
        ConfigForm,
        StyleForm
    },
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        noEditComponent() {
            return !Object.keys(this.editingComponent).length;
        }
    },
    data() {
        return {
            curEditType: ["baseConfig"],
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
    .el-collapse-item{
        padding: 0 20px;
    }
}
</style>

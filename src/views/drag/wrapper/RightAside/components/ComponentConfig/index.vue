<template>
    <div class="component-config">
        <el-collapse
            v-show="!noEditingComponent"
            v-model="curEditType"
            @change="chengeCurEditType"
        >
            <el-collapse-item
                v-for="({ title, name, component }, index) in editTypeMap"
                :key="index"
                class="el-collapse-item"
                :title="title"
                :name="name"
            >
                <component :is="component" :editing-component="editingComponent" />
            </el-collapse-item>
        </el-collapse>
        <div v-show="noEditingComponent" class="empty">
            暂无可操作项,去编辑区选择吧
        </div>
    </div>
</template>

<script>
import ConfigForm from "./ConfigForm.vue";
import StyleForm from "./StyleForm.vue";
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
        noEditingComponent() {
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
            // console.log(i);
        }
    }
};
</script>

<style lang="scss" scoped>
.el-collapse-item{
    padding: 0 20px;
}
.empty{
    text-align: center;
    padding-top: 100px;
    color: #999;
}
</style>

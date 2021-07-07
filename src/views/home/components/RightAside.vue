<template>
    <el-aside class="app-right-aside clearfix" width="400px">
        <div v-show="noEditComponent">
            暂无操作信息
        </div>
        <div v-show="!noEditComponent">
            <p>组件名：{{ editingComponent && editingComponent.desc }}{{ editingComponent && editingComponent.name }}</p>
            <p>id：{{ editingComponent && editingComponent.uuid }}</p>
            <el-form
                :model="editingComponent.configMap"
                label-suffix="："
            >
                <div
                    v-for="(item, key) in editingComponent.configMap"
                    :key="key"
                >
                    <el-form-item
                        v-if="!item.when || item.when(editingComponent.configMap)"
                        :label="item.label"
                    >
                        <div
                            v-if="!item.when || item.when(editingComponent.configMap)"
                            class="right-form-item"
                        >
                            <el-input
                                v-if="item.formType === 'input'"
                                v-model="item.value"
                            />
                            <el-select
                                v-if="item.formType === 'select'"
                                v-model="item.value"
                            >
                                <el-option
                                    v-for="i in item.valueMap"
                                    :key="i.value"
                                    :label="i.desc"
                                    :value="i.value"
                                />
                            </el-select>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </el-aside>
</template>

<script>
export default {
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
        };
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
.app-right-aside{
    width: 400px;
    height: 100%;
    border-left: 1px solid #dcdfe6;
    padding: 20px;
    box-sizing: border-box;
    .right-form-item{
        display: inline-block;
        width: 60%;
    }
}
</style>

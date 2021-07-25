<template>
    <el-form
        :model="editingComponent.configMap"
        label-suffix="："
        label-width="90px"
        label-position="left"
        size="mini"
    >
        <div
            v-for="(item, key) in editingComponent.configMap"
            :key="key"
        >
            <el-form-item
                v-if="!item.when || item.when(editingComponent.configMap)"
                class="right-form-item"
                :label="item.label"
            >
                <el-input
                    v-if="item.formType === 'input'"
                    v-model="item.value"
                />
                <el-input
                    v-if="item.formType === 'textarea'"
                    v-model="item.value"
                    :autosize="{ minRows: 2, maxRows: 8}"
                    type="textarea"
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
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
export default {
    name: "ConfigForm",
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style lang="scss" scoped>
.right-form-item{
    display: inline-block;
    width: 85%;
    .el-select{
        display: block;
    }
}
</style>

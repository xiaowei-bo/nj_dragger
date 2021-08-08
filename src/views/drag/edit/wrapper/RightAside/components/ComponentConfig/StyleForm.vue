<template>
    <el-form
        :model="editingComponent.styleMap"
        label-suffix="："
        label-width="90px"
        label-position="left"
        size="mini"
    >
        <div
            v-for="(item, key) in editingComponent.styleMap"
            :key="key"
        >
            <el-form-item
                class="right-form-item"
                :label="item.label"
            >
                <el-input
                    v-if="item.formType === 'input'"
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    @change="v => { editingComponent.styleInfo[item.key] = v }"
                />
                <el-color-picker
                    v-if="item.formType === 'color'"
                    v-model="item.value"
                    show-alpha
                    @change="v => { editingComponent.styleInfo[item.key] = v }"
                />
                <el-select
                    v-if="item.formType === 'select'"
                    v-model="item.value"
                    @change="v => { editingComponent.styleInfo[item.key] = v }"
                >
                    <el-option
                        v-for="i in item.valueMap"
                        :key="i.value"
                        :label="i.desc"
                        :value="i.value"
                    />
                </el-select>
                <el-tooltip
                    v-if="item.formType !== 'upload' && item.tip"
                    effect="dark"
                    :content="item.tip"
                    placement="top"
                >
                    <i class="el-icon-info"></i>
                </el-tooltip>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
export default {
    name: "StyleForm",
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
    .el-input, .el-textarea, .el-select, .el-color-picker{
        display: inline-block;
        width: 85%;
        margin-right: 10px;
    }
    .el-select .el-input {
        width: 100%;
    }
    .el-color-picker{
    vertical-align: middle;
}
}
</style>

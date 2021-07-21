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
    width: 60%;
}
</style>

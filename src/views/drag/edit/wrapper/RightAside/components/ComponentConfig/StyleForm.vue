<template>
    <el-form
        :model="editingComponent.styleInfo"
        label-suffix="："
        label-width="90px"
        label-position="left"
        size="mini"
    >
        <div
            v-for="(item, key) in editingComponent.styleInfo"
            :key="key"
        >
            <el-form-item
                class="right-form-item"
                :label="commonStyleConfig[key].label"
            >
                <el-input
                    v-if="commonStyleConfig[key].formType === 'input'"
                    v-model="commonStyleConfig[key].value"
                    :placeholder="commonStyleConfig[key].placeholder"
                    @change="(v) => { editingComponent.styleInfo[key] = v}"
                />
                <el-color-picker
                    v-if="commonStyleConfig[key].formType === 'color'"
                    v-model="commonStyleConfig[key].value"
                    show-alpha
                    @change="(v) => { editingComponent.styleInfo[key] = v || ''}"
                />
                <el-select
                    v-if="commonStyleConfig[key].formType === 'select'"
                    v-model="commonStyleConfig[key].value"
                    @change="(v) => { editingComponent.styleInfo[key] = v}"
                >
                    <el-option
                        v-for="i in commonStyleConfig[key].valueMap"
                        :key="i.value"
                        :label="i.desc"
                        :value="i.value"
                    />
                </el-select>
                <el-tooltip
                    v-if="commonStyleConfig[key].formType !== 'upload' && commonStyleConfig[key].tip"
                    effect="dark"
                    :content="commonStyleConfig[key].tip"
                    placement="top"
                >
                    <i class="el-icon-info"></i>
                </el-tooltip>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
import configList from "@/plugins/config.js";
import commonStyleConfig from "@/config/style.js";
export default {
    name: "StyleForm",
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        "editingComponent.uuid": {
            handler: function(val) {
                if (!val) return;
                for (const key in configList[this.editingComponent.configCode].styleInfo) {
                    if (this.editingComponent.styleInfo[key] === undefined) {
                        this.editingComponent.styleInfo[key] = configList[this.editingComponent.configCode].styleInfo[key];
                    }
                }
                // 数据初始化
                for (const key in this.editingComponent.styleInfo) {
                    this.commonStyleConfig[key].value = this.editingComponent.styleInfo[key];
                }
            }
        }
    },
    data() {
        return {
            commonStyleConfig
        };
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

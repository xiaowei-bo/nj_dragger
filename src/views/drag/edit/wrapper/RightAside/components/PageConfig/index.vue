<template>
    <el-form
        :model="curPageData"
        class="page-config"
        label-suffix="："
        label-width="90px"
        label-position="left"
        size="mini"
    >
        <el-form-item label="页面标题" class="page-config-item right-form-item">
            <el-input v-model="curPageData.name" v-setDisableKeycode placeholder="请输入页面标题" />
            <el-tooltip
                effect="dark"
                content="请输入页面标题"
                placement="top"
            >
                <i class="el-icon-info"></i>
            </el-tooltip>
        </el-form-item>
        <div
            v-for="(item, key) in curPageData.commonStyle"
            :key="key"
        >
            <el-form-item
                :label="commonStyleConfig[key].label"
                class="page-config-item right-form-item"
            >
                <el-input
                    v-if="commonStyleConfig[key].formType === 'input'"
                    v-model="commonStyleConfig[key].value"
                    v-setDisableKeycode
                    :placeholder="commonStyleConfig[key].placeholder"
                    @change="(v) => { curPageData.commonStyle[key] = v}"
                />
                <el-color-picker
                    v-if="commonStyleConfig[key].formType === 'color'"
                    v-model="commonStyleConfig[key].value"
                    show-alpha
                    @change="(v) => { curPageData.commonStyle[key] = v || ''}"
                />
                <el-select
                    v-if="commonStyleConfig[key].formType === 'select'"
                    v-model="commonStyleConfig[key].value"
                    @change="(v) => { curPageData.commonStyle[key] = v}"
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
import commonStyleConfig from "@/config/style.js";
export default {
    props: {
        curPageData: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        "curPageData.uuid": {
            handler: function(val) {
                if (!val) return;
                // 数据初始化
                for (const key in this.curPageData.commonStyle) {
                    if (!["", null, undefined].includes(this.curPageData.commonStyle[key])) {
                        this.commonStyleConfig[key].value = this.curPageData.commonStyle[key];
                    }
                }
                this.curPageData.name = this.curPageData.name || `页面${this.curPageData.index + 1}`;
            }
        }
    },
    data() {
        return {
            commonStyleConfig
        };
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
.page-config{
    padding: 0 20px;
}
.page-config-item{
    display: inline-block;
    width: 85%;
}
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
</style>

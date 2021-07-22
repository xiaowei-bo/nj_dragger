<template>
    <el-form
        :model="curPageData"
        class="page-config"
        label-suffix="："
        label-width="90px"
        label-position="left"
        size="mini"
    >
        <el-form-item label="页面标题" class="page-config-item">
            <el-input v-model="curPageData.name" />
        </el-form-item>
        <div
            v-for="(item, key) in curPageData.commonStyle"
            :key="key"
        >
            <el-form-item
                :label="commonStyleConfig[key].label"
                class="page-config-item"
            >
                <div
                    class="right-form-item"
                >
                    <el-input
                        v-if="commonStyleConfig[key].formType === 'input'"
                        v-model="commonStyleConfig[key].value"
                        @change="(v) => { curPageData.commonStyle[key] = v}"
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
                </div>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
import configList from "@/plugins/config.js";
const commonStyleConfig = configList["commonStyleConfig"];
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
    width: 60%;
}
</style>

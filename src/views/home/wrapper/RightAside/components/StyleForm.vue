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
                :label="commonStyleConfig[key].label"
            >
                <div
                    class="right-form-item"
                >
                    <el-input
                        v-if="commonStyleConfig[key].formType === 'input'"
                        v-model="commonStyleConfig[key].value"
                        @change="(v) => { editingComponent.styleInfo[key] = v}"
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
                </div>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
import configList from "@/plugins/config.js";
const commonStyleConfig = configList["commonStyleConfig"];
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
                console.log(this.commonStyleConfig['text-align'].value)
                for (const key in this.editingComponent.styleInfo) {
                    console.log(this.commonStyleConfig[key].value + '>>' + this.editingComponent.styleInfo[key])
                    this.commonStyleConfig[key].value = this.editingComponent.styleInfo[key]
                }
                console.log(this.commonStyleConfig['text-align'].value)
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
    width: 60%;
}
</style>

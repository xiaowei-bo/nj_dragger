<template>
    <div class="events">
        <div v-for="(item, index) in editingComponent.events" :key="index" class="event-item">
            <el-form
                :model="item"
                label-suffix="："
                label-width="90px"
                label-position="left"
                size="mini"
            >
                <el-form-item
                    label="触发方式"
                    class="right-form-item"
                >
                    <el-select
                        v-model="item.trigger"
                    >
                        <el-option
                            v-for="i in eventConfig.trigger.valueMap"
                            :key="i.value"
                            :label="i.desc"
                            :value="i.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="触发行为"
                    class="right-form-item"
                >
                    <el-select
                        v-model="item.action"
                    >
                        <el-option
                            v-for="i in eventConfig.action.valueMap"
                            :key="i.value"
                            :label="i.desc"
                            :value="i.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form
                :model="item.configMap"
                label-suffix="："
                label-width="90px"
                label-position="left"
                size="mini"
            >
                <div
                    v-for="(val, key) in item.configMap"
                    :key="key"
                >
                    <el-form-item
                        class="right-form-item"
                        :label="val.label"
                    >
                        <el-input
                            v-if="val.formType === 'input'"
                            v-model="val.value"
                        />
                        <el-color-picker
                            v-if="val.formType === 'color'"
                            v-model="val.value"
                        />
                        <el-select
                            v-if="val.formType === 'select'"
                            v-model="val.value"
                        >
                            <el-option
                                v-for="i in val.valueMap"
                                :key="i.value"
                                :label="i.desc"
                                :value="i.value"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            <el-divider content-position="right">事件分割处</el-divider>
        </div>
        <div class="add-btn">
            <el-button icon="el-icon-plus" circle @click="addEvent" />
        </div>
    </div>
</template>

<script>
import eventConfig from "@/config/event.js";
import { deepClone } from "@/utils";
export default {
    name: "ConfigForm",
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            eventConfig,
            eventData: {
                trigger: "click",
                action: "toast",
                configMap: deepClone(eventConfig["configMap"]["toast"])
            }
        };
    },
    methods: {
        addEvent() {
            const event = deepClone(this.eventData);
            this.editingComponent.events.push(event);
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
.add-btn{
    text-align: center;
}
</style>

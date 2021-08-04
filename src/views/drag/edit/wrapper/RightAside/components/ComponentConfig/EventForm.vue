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
                    <el-tooltip
                        effect="dark"
                        content="请选择事件触发方式"
                        placement="top"
                    >
                        <i class="el-icon-info"></i>
                    </el-tooltip>
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
                    <el-tooltip
                        effect="dark"
                        content="请选择事件触发行为"
                        placement="top"
                    >
                        <i class="el-icon-info"></i>
                    </el-tooltip>
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
                        v-if="!val.when || val.when(item.action)"
                        class="right-form-item"
                        :label="val.label"
                    >
                        <el-input
                            v-if="val.formType === 'input'"
                            v-model="val.value"
                            :placeholder="val.placeholder"
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
                        <div v-if="val.formType === 'code'" class="el-input">
                            <el-button type="primary" @click="handlerCode(val)">{{ val.value ? "编辑代码" : "添加代码" }}</el-button>
                        </div>
                        <el-tooltip
                            v-if="val.formType !== 'upload' && val.tip"
                            effect="dark"
                            :content="val.tip"
                            placement="top"
                        >
                            <i class="el-icon-info"></i>
                        </el-tooltip>
                    </el-form-item>
                </div>
            </el-form>
            <el-divider content-position="right">事件分割处</el-divider>
        </div>
        <el-dialog
            :title="'添加 js 代码'"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            width="60%"
        >
            <p class="tip">可用变量：</p>
            <p class="tip txt">平台方法：toastTip(toast提示)</p>
            <p class="tip txt">全局变量：例如：document, history, navigator, print, alert 等</p>
            <PrismEditor
                v-model="currentCode"
                class="my-editor"
                :highlight="highlight"
                :line-numbers="true"
                :tab-size="4"
                @click.native="focusCode"
            />
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handlerSure">确 定</el-button>
            </span>
        </el-dialog>
        <div class="add-btn">
            <el-button icon="el-icon-plus" circle @click="addEvent" />
        </div>
    </div>
</template>

<script>
import eventConfig from "@/config/event.js";
import { deepClone } from "@/utils";
import { PrismEditor } from "vue-prism-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "vue-prism-editor/dist/prismeditor.min.css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

export default {
    components: { PrismEditor },
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
                configMap: deepClone(eventConfig["configMap"])
            },
            dialogVisible: false,
            currentCode: ""
        };
    },
    methods: {
        addEvent() {
            const event = deepClone(this.eventData);
            this.editingComponent.events.push(event);
        },
        highlight(code) {
            return highlight(code, languages.js);
        },
        handlerCode(val) {
            // const headerEl = document.getElementById("appHeader");
            // headerEl.style.zIndex = 0;
            this.currentCode = val.value;
            this.dialogVisible = true;
            this.editingEvent = val;
        },
        handlerSure() {
            this.editingEvent.value = this.currentCode;
            this.dialogVisible = false;
            this.currentCode = "";
        },
        focusCode() {
            try {
                const textarea = document.getElementsByClassName("my-editor")[0].getElementsByTagName("textarea")[0];
                textarea.focus();
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>

<style lang="scss">
.right-form-item{
    display: inline-block;
    width: 85%;
    .el-input, .el-textarea, .el-select, .el-color-picker, .prism-editor-wrapper{
        display: inline-block;
        width: 85%;
        margin-right: 10px;
    }
    .el-select .el-input {
        width: 100%;
    }
}
.events{
    .el-dialog{
        .el-dialog__body{
            height: 300px;
            padding-top: 0;
        }
        .tip{
            color: #999;
            &.txt{
                text-indent: 25px;
            }
        }
    }
}
.my-editor {
    cursor: text;
    background: #2d2d2d;
    color: #ccc;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    height: 75%;
    .prism-editor__container{
        textarea {
            outline: none !important;
        }
    }
}
.add-btn{
    text-align: center;
}
</style>

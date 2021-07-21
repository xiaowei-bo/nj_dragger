/**
 * @desc 组件配置文件输出出口
 */

import TextConfig from "./Text/config.js";
import ButtonConfig from "./Button/config.js";
import ImageConfig from "./Image/config.js";

const commonStyleConfig = {
    "position": {
        key: "position",
        value: "relative",
        valueMap: [{
            value: "relative",
            desc: "相对定位"
        }],
        valueType: "enum",
        formType: "select",
        placeholder: "",
        tip: "请选择布局方式",
        label: "布局方式"
    },
    "width": {
        key: "width",
        value: 300,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入组件宽度",
        label: "宽度"
    },
    "height": {
        key: "height",
        value: 80,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入组件高度",
        label: "高度"
    },
    "border-top-left-radius": {
        key: "border-top-left-radius",
        value: 40,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入组件圆角度",
        label: "左上圆角"
    },
    "border-top-right-radius": {
        key: "border-top-right-radius",
        value: 40,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入组件圆角度",
        label: "右上圆角"
    },
    "border-bottom-left-radius": {
        key: "border-bottom-left-radius",
        value: 40,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入组件圆角度",
        label: "左下圆角"
    },
    "border-bottom-right-radius": {
        key: "border-bottom-right-radius",
        value: 40,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入组件圆角度",
        label: "右下圆角"
    },
    "font-size": {
        key: "font-size",
        value: 18,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入字体大小",
        label: "字体大小"
    },
    "line-height": {
        key: "line-height",
        value: 18,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入行间距",
        label: "行间距"
    },
    "text-align": {
        key: "text-align",
        value: "left",
        valueMap: [{
            value: "left",
            desc: "左对齐"
        }, {
            value: "center",
            desc: "居中"
        }, {
            value: "right",
            desc: "右对齐"
        }],
        valueType: "enum",
        formType: "select",
        placeholder: "",
        tip: "请选择对齐方式",
        label: "对齐方式"
    },
    "margin-left": {
        key: "margin-left",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入间距",
        label: "外左间距"
    },
    "margin-right": {
        key: "margin-right",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入间距",
        label: "外右间距"
    },
    "margin-top": {
        key: "margin-top",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入间距",
        label: "外上间距"
    },
    "margin-bottom": {
        key: "margin-bottom",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入间距",
        label: "外下间距"
    },
    "padding-left": {
        key: "padding-left",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入内间距",
        label: "内左间距"
    },
    "padding-right": {
        key: "padding-right",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入内间距",
        label: "内右间距"
    },
    "padding-top": {
        key: "padding-top",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入内间距",
        label: "内上间距"
    },
    "padding-bottom": {
        key: "padding-bottom",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入内间距",
        label: "内下间距"
    },
    "z-index": {
        key: "z-index",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入层级",
        label: "层级"
    },
    "background-color": {
        key: "background-color",
        value: "#409eff",
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入背景色",
        label: "背景色"
    },
    "color": {
        key: "background-color",
        value: "#ffffff",
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入字体颜色",
        label: "字体颜色"
    }
};

export default {
    TextConfig,
    ButtonConfig,
    ImageConfig,
    commonStyleConfig
};

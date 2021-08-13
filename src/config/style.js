/**
 * @description 公共样式配置
 */
const commonStyleConfig = {
    "display": {
        key: "display",
        value: "block",
        valueMap: [{
            value: "block",
            desc: "块元素"
        }, {
            value: "inline-block",
            desc: "行内块元素"
        }],
        valueType: "enum",
        formType: "select",
        placeholder: "",
        tip: "请选择元素类型",
        label: "元素类型"
    },
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
        placeholder: "请输入组件宽度",
        tip: "请输入组件宽度",
        label: "宽度"
    },
    "height": {
        key: "height",
        value: 80,
        valueType: "string",
        formType: "input",
        placeholder: "请输入组件高度",
        tip: "请输入组件高度",
        label: "高度"
    },
    "border-radius": {
        key: "border-radius",
        value: 40,
        valueType: "string",
        formType: "input",
        placeholder: "请输入组件圆角度",
        tip: "请输入组件圆角度",
        label: "圆角"
    },
    "border-top-left-radius": {
        key: "border-top-left-radius",
        value: 40,
        valueType: "string",
        formType: "input",
        placeholder: "请输入组件圆角度",
        tip: "请输入组件圆角度",
        label: "左上圆角"
    },
    "border-top-right-radius": {
        key: "border-top-right-radius",
        value: 40,
        valueType: "string",
        formType: "input",
        placeholder: "请输入组件圆角度",
        tip: "请输入组件圆角度",
        label: "右上圆角"
    },
    "border-bottom-left-radius": {
        key: "border-bottom-left-radius",
        value: 40,
        valueType: "string",
        formType: "input",
        placeholder: "请输入组件圆角度",
        tip: "请输入组件圆角度",
        label: "左下圆角"
    },
    "border-bottom-right-radius": {
        key: "border-bottom-right-radius",
        value: 40,
        valueType: "string",
        formType: "input",
        placeholder: "请输入组件圆角度",
        tip: "请输入组件圆角度",
        label: "右下圆角"
    },
    "font-size": {
        key: "font-size",
        value: 18,
        valueType: "string",
        formType: "input",
        placeholder: "请输入字体大小",
        tip: "请输入字体大小",
        label: "字体大小"
    },
    "line-height": {
        key: "line-height",
        value: 18,
        valueType: "string",
        formType: "input",
        placeholder: "请输入行间距",
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
        placeholder: "请输入间距",
        tip: "请输入间距",
        label: "外左间距"
    },
    "margin-right": {
        key: "margin-right",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "请输入间距",
        tip: "请输入间距",
        label: "外右间距"
    },
    "margin-top": {
        key: "margin-top",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "请输入间距",
        tip: "请输入间距",
        label: "外上间距"
    },
    "margin-bottom": {
        key: "margin-bottom",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "请输入间距",
        tip: "请输入间距",
        label: "外下间距"
    },
    "padding-left": {
        key: "padding-left",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "请输入内间距",
        tip: "请输入内间距",
        label: "内左间距"
    },
    "padding-right": {
        key: "padding-right",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "请输入内间距",
        tip: "请输入内间距",
        label: "内右间距"
    },
    "padding-top": {
        key: "padding-top",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "请输入内间距",
        tip: "请输入内间距",
        label: "内上间距"
    },
    "padding-bottom": {
        key: "padding-bottom",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "请输入内间距",
        tip: "请输入内间距",
        label: "内下间距"
    },
    "z-index": {
        key: "z-index",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "请输入层级",
        tip: "请输入层级",
        label: "层级"
    },
    "background-color": {
        key: "background-color",
        value: "",
        valueType: "string",
        formType: "color",
        placeholder: "",
        tip: "请选择背景色",
        label: "背景色"
    },
    "background-image": {
        key: "background-image",
        value: "",
        valueType: "string",
        formType: "input",
        placeholder: "请输入背景图片链接",
        tip: "请输入背景图片链接",
        label: "背景图"
    },
    "background-size": {
        key: "background-size",
        value: "auto",
        valueMap: [{
            value: "auto",
            desc: "自动"
        }, {
            value: "cover",
            desc: "短边覆盖"
        }, {
            value: "contain",
            desc: "长边覆盖"
        }],
        valueType: "enum",
        formType: "select",
        placeholder: "",
        tip: "请选择背景覆盖方式",
        label: "背景布局"
    },
    "color": {
        key: "color",
        value: "#ffffff",
        valueType: "string",
        formType: "color",
        placeholder: "",
        tip: "请选择字体颜色",
        label: "字体颜色"
    },
    "text-indent": {
        key: "text-indent",
        value: 0,
        valueType: "string",
        formType: "input",
        placeholder: "",
        tip: "请输入首行缩进值",
        label: "首行缩进"
    },
    "font-weight": {
        key: "font-weight",
        value: "",
        valueMap: [{
            value: "normal",
            desc: "正常"
        }, {
            value: "bold",
            desc: "加粗"
        }],
        valueType: "enum",
        formType: "select",
        placeholder: "",
        tip: "请选择字重",
        label: "字重"
    },
    "border-width": {
        key: "border-width",
        value: "0",
        valueType: "string",
        formType: "input",
        placeholder: "请输入边框宽度",
        tip: "请输入边框宽度",
        label: "边框宽度"
    },
    "border-style": {
        key: "border-style",
        value: "solid",
        valueMap: [{
            value: "solid",
            desc: "实线"
        }, {
            value: "dashed",
            desc: "虚线"
        }, {
            value: "dotted",
            desc: "点状线"
        }, {
            value: "double",
            desc: "双线"
        }],
        valueType: "enum",
        formType: "select",
        placeholder: "",
        tip: "请选择边框样式",
        label: "边框样式"
    },
    "border-color": {
        key: "border-color",
        value: "#999",
        valueType: "string",
        formType: "color",
        placeholder: "",
        tip: "请选择边框颜色",
        label: "边框颜色"
    }
};

export default commonStyleConfig;

export default {
    name: "NjButton", // 组件名
    desc: "按钮",
    icon: "icon-anniu",
    animations: [], // 图层的动画,可以支持多个动画
    events: [], // 事件配置数据，每个图层可以添加多个事件
    configMap: { // 组件配置信息
        btnText: {
            key: "btnText",
            value: "按钮",
            valueType: "string",
            formType: "input",
            placeholder: "",
            tip: "请输入按钮文案",
            label: "按钮文案"
        }
    },
    styleInfo: { // 样式
        "display": "block",
        "position": "relative",
        "z-index": "0",
        "text-align": "center",
        "line-height": "40px",
        "background-color": "#409eff",
        "border-top-left-radius": "40px",
        "border-top-right-radius": "40px",
        "border-bottom-left-radius": "40px",
        "border-bottom-right-radius": "40px",
        "color": "#ffffff",
        "font-size": "16px",
        "width": "300px",
        "height": "40px",
        "margin-left": "auto",
        "margin-right": "auto",
        "margin-top": "0",
        "margin-bottom": "0"
    }
};

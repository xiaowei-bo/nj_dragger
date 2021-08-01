export default {
    name: "NjIframe", // 组件名
    desc: "网页",
    icon: "icon-iframe",
    animate: "", // 图层的动画,可以支持多个动画
    events: [], // 事件配置数据，每个图层可以添加多个事件
    configMap: { // 组件配置信息
        webUrl: {
            key: "webUrl",
            value: "http://m.baidu.com",
            valueType: "string",
            formType: "input",
            placeholder: "请输入网页链接",
            tip: "请输入网页链接",
            label: "网页链接"
        }
    },
    styleInfo: { // 样式
        "display": "block",
        "position": "relative",
        "z-index": "0",
        "width": "100%",
        "height": "100%",
        "margin-left": "auto",
        "margin-right": "auto",
        "margin-top": "0",
        "margin-bottom": "0"
    }
};

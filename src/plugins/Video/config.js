export default {
    name: "NjVideo", // 组件名
    desc: "视频",
    icon: "icon-video",
    animate: "", // 图层的动画,可以支持多个动画
    events: [], // 事件配置数据，每个图层可以添加多个事件
    configMap: { // 组件配置信息
        videoUrl: {
            key: "videoUrl",
            value: "",
            valueType: "string",
            formType: "input",
            placeholder: "请输入视频链接",
            tip: "请输入视频链接",
            label: "视频链接"
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

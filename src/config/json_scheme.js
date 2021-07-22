const activity = {
    title: "", // 标题
    description: "", // 描述
    coverImage: "", // 封面
    author: "", // 作者
    pages: [], // 多页页面
    shareConfig: {} // 微信分享配置
};

const page = {
    name: "",
    elements: [], // 页面元素
    commonStyle: {
        "background-color": "#fff",
        "background-image": "",
        "background-size": "cover"
    },
    config: {}
};

const element = {
    elName: "", // 组件名
    animations: [], // 图层的动画,可以支持多个动画
    events: [], // 事件配置数据，每个图层可以添加多个事件
    propsValue: {}, // 属性参数
    value: "", // 绑定值
    valueType: "String", // 值类型
    configInfo: { // 特殊配置
        isDraggable: true,
        lockAspectRatio: true
    },
    styleInfo: { // 样式
        position: "relative",
        zIndex: "7"
    },
    dragInfo: { // 拖拽信息
        x: 0,
        y: 0,
        w: 750,
        h: 100
    }
};

export {
    activity,
    page,
    element
};

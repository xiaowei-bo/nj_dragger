const activity = {
    title: "", // 标题
    description: "", // 描述
    coverImage: "", // 封面
    auther: "", // 作者
    script: "", // 页面插入脚本
    width: 375, // 高
    height: 644, // 宽
    pages: [], // 多页页面
    shareConfig: {}, // 微信分享配置
    pageMode: 0 // 渲染模式，用于扩展多种模式渲染，翻页h5/长页/PC页面等等
};

const page = {
    name: "",
    elements: [], // 页面元素
    commonStyle: {
        backgroundColor: "",
        backgroundImage: "",
        backgroundSize: "cover"
    },
    config: {}
};

const component = {
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

export default {
    activity,
    page,
    component
};

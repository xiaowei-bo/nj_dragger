/**
 * @description json_scheme 全局定义
 * formType: [ "input", "select", "color", "upload", "textarea"]
 */

const activity = {
    title: "", // 标题
    description: "", // 描述
    coverImage: "", // 封面图
    author: "", // 作者
    pages: [] // 多页页面
};

const page = {
    name: "", // 页面标题
    elements: [], // 页面元素
    commonStyle: { // 页面样式配置
        "background-color": "",
        "background-image": "",
        "background-size": "cover"
    },
    config: {} // 其他配置
};

const element = {
    name: "", // 组件名
    desc: "", // 组件描述
    icon: "", // 组件icon
    animate: "", // 组件入场动画
    events: [], // 事件配置数据，每个图层可以添加多个事件
    configMap: {}, // 组件配置信息
    styleInfo: {} // 样式信息
};

export {
    activity,
    page,
    element
};

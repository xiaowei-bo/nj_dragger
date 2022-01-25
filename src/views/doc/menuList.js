const draggerMenuList = [
    {
        code: "a",
        desc: "前言",
        MdComponent: () => import("./dragger/前言.md")
    }, {
        code: "b",
        desc: "架构图",
        MdComponent: () => import("./dragger/架构图.md")
    }, {
        code: "c",
        desc: "效果图",
        MdComponent: () => import("./dragger/效果图.md")
    }, {
        code: "d",
        desc: "功能清单",
        MdComponent: () => import("./dragger/功能清单.md")
    }, {
        code: "e",
        desc: "目录结构",
        MdComponent: () => import("./dragger/目录结构.md")
    }, {
        code: "f",
        desc: "数据结构",
        MdComponent: () => import("./dragger/数据结构.md")
    }, {
        code: "g",
        desc: "部分功能代码",
        MdComponent: () => import("./dragger/部分功能代码.md")
    }, {
        code: "h",
        desc: "组件库设计",
        MdComponent: () => import("./dragger/组件库设计.md")
    }, {
        code: "i",
        desc: "后端服务",
        MdComponent: () => import("./dragger/后端服务.md")
    }
];

export {
    draggerMenuList
};

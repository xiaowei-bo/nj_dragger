const draggerMenuList = [
    {
        code: "introduce",
        desc: "介绍",
        MdComponent: () => import("./dragger/介绍.md")
    }
];

const deployerMenuList = [
    {
        code: "introduce",
        desc: "介绍",
        MdComponent: () => import("./deployer/介绍.md")
    }
];

export {
    draggerMenuList,
    deployerMenuList
};

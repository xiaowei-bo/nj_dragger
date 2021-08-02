const draggerMenuList = [
    {
        code: "introduce",
        desc: "介绍",
        component: () => import("./dragger/介绍.md")
    }
];

const deployerMenuList = [
    {
        code: "introduce",
        desc: "介绍",
        component: () => import("./deployer/介绍.md")
    }
];

export {
    draggerMenuList,
    deployerMenuList
};

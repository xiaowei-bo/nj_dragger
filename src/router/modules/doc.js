const docRouter = [
    {
        path: "/doc/dragger",
        component: () => import(/* webpackChunkName: 'doc' */"@/views/doc"),
        name: "draggerDoc",
        meta: {
            title: "文档",
            icon: "el-icon-tickets",
            noCache: true
        }
    },
    {
        path: "/doc/deployer",
        component: () => import(/* webpackChunkName: 'doc' */"@/views/doc"),
        name: "deployerDoc",
        meta: {
            title: "文档",
            icon: "el-icon-tickets",
            noCache: true
        }
    }
];
export default docRouter;

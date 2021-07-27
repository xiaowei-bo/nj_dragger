const autoRoutes = [
    {
        path: "/auto/cicd",
        name: "autoCICD",
        component: () => import(/* webpackChunkName: 'auto-cicd' */"@/views/auto/index"),
        meta: {
            title: "可视化部署",
            icon: "el-icon-film"
        }
    }
];

export default autoRoutes;

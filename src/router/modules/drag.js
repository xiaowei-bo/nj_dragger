const dragRoutes = [
    {
        path: "/drag",
        name: "drag",
        component: () => import(/* webpackChunkName: 'drag' */"@/views/drag/index"),
        redirect: "/drag/edit",
        meta: {
            title: "可视化",
            icon: "el-icon-film"
        },
        children: [
            {
                path: "edit",
                component: () => import(/* webpackChunkName: 'edit' */"@/views/drag/edit"),
                name: "edit",
                meta: {
                    title: "编辑器",
                    icon: "el-icon-tickets",
                    noCache: true
                }
            }
        ]
    }
];

export default dragRoutes;

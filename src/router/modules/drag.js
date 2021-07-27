const dragRoutes = [
    {
        path: "/drag",
        name: "drag",
        component: () => import(/* webpackChunkName: 'drag' */"@/views/drag/index"),
        redirect: "/drag/list",
        meta: {
            title: "可视化",
            icon: "el-icon-film"
        },
        children: [
            {
                path: "edit",
                component: () => import(/* webpackChunkName: 'drag-edit' */"@/views/drag/edit"),
                name: "dragEdit",
                meta: {
                    title: "活动编辑器",
                    icon: "el-icon-tickets",
                    noCache: true
                }
            },
            {
                path: "list",
                component: () => import(/* webpackChunkName: 'drag-list' */"@/views/drag/list"),
                name: "dragList",
                meta: {
                    title: "活动列表",
                    icon: "el-icon-tickets",
                    noCache: true
                }
            },
            {
                path: "doc",
                component: () => import(/* webpackChunkName: 'drag-doc' */"@/views/drag/doc"),
                name: "dragDoc",
                meta: {
                    title: "文档",
                    icon: "el-icon-tickets",
                    noCache: true
                }
            }
        ]
    }
];

export default dragRoutes;

const boardRoutes = [
    {
        path: "/board",
        name: "board",
        component: () => import(/* webpackChunkName: 'board' */"@/views/board/index"),
        meta: {
            title: "数据看板",
            icon: "el-icon-film"
        }
    }
];

export default boardRoutes;

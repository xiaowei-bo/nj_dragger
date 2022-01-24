const userRoutes = [
    {
        path: "/user",
        name: "user",
        component: () => import(/* webpackChunkName: 'user' */"@/views/user/index"),
        redirect: "/user/login",
        meta: {
            title: "用户",
            icon: "el-icon-film"
        },
        children: [
            {
                path: "login",
                component: () => import(/* webpackChunkName: 'user-login' */"@/views/user/Login"),
                name: "userLogin",
                meta: {
                    title: "登录",
                    icon: "el-icon-tickets"
                }
            }, {
                path: "region",
                component: () => import(/* webpackChunkName: 'user-region' */"@/views/user/Region"),
                name: "userRegion",
                meta: {
                    title: "注册",
                    icon: "el-icon-tickets"
                }
            }, {
                path: "list",
                component: () => import(/* webpackChunkName: 'user-region' */"@/views/user/List"),
                name: "userList",
                meta: {
                    title: "用户列表",
                    icon: "el-icon-tickets"
                }
            }
        ]
    }
];

export default userRoutes;

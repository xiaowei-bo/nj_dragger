import { createRouter, createWebHashHistory } from "vue-router";

const constantRoutes = [
    {
        path: "/",
        name: "home",
        component: () => import(/* webpackChunkName: 'index' */"@/views/home/index")
    }
];
// const asyncRoutes = [];
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
});

export default router;


import Vue from "vue";
import Router from "vue-router";

import dragRouter from "./modules/drag";
import boardRouter from "./modules/board";
import autoRouter from "./modules/auto";
import docRouter from "./modules/doc";

Vue.use(Router);

const constantRoutes = [
    {
        path: "/",
        name: "home",
        component: () => import(/* webpackChunkName: 'home' */"@/views/home/index")
    },
    ...dragRouter,
    ...boardRouter,
    ...autoRouter,
    ...docRouter
];
// const asyncRoutes = [];

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();

export default router;


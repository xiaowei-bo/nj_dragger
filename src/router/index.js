import Vue from "vue";
import Router from "vue-router";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(() => window.location.reload());
};

import dragRouter from "./modules/drag";
import boardRouter from "./modules/board";
import docRouter from "./modules/doc";
import userRoutes from "./modules/user";

Vue.use(Router);

const constantRoutes = [
    {
        path: "/",
        name: "home",
        component: () => import(/* webpackChunkName: 'home' */"@/views/home/index")
    },
    ...dragRouter,
    ...boardRouter,
    ...docRouter,
    ...userRoutes
];
// const asyncRoutes = [];

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();
export default router;


import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const constantRoutes = [
    {
        path: "/",
        name: "home",
        component: () => import(/* webpackChunkName: 'home' */"@/views/home/index")
    }
];
// const asyncRoutes = [];

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();

export default router;


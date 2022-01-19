import router from "./router";
import store from "./store";

const whiteList = ["home", "userLogin", "userRegion"];
router.beforeEach(async (to, from, next) => {
    if (to.name === from.name) return;
    if (Object.keys(store.state.user.userInfo).length) return next();
    await store.dispatch("setUserInfo");
    if (whiteList.includes(to.name)) return next();
    if (Object.keys(store.state.user.userInfo).length) return next();
    router.push({
        name: "userLogin"
    });
});
router.afterEach(async (to) => {});

import router from "./router/index.js";

router.beforeEach(async (to, from, next) => {
    if (to.name === from.name) return;
    console.log("to", to);
    console.log("from", from);
    next();
});
router.afterEach(async (to) => {});

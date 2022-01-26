import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import ElementUI from "element-ui";
import NjElement from "@/plugins/index.js";
import NjDirective from "./directives/index.js";
import { handlerInterval } from "./utils";
import { reportOnlineTime } from "./api/user";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/index.scss";
import "./permission.js";

// markdown 样式文件
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/color-brewer.css";
import "vue-dotmd-loader/src/docs.css";

Vue.use(ElementUI);
Vue.use(NjElement);
Vue.use(NjDirective);

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});

const INTERVAL_TIME = 5000;
handlerInterval(() => {
    reportOnlineTime(INTERVAL_TIME);
}, INTERVAL_TIME);

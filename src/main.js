import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import ElementUI from "element-ui";
import NjElement from "@/plugins/index.js";
import NjDirective from "./directives/index.js";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/index.scss";
import "./permission.js";

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

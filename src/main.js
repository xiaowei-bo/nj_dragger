import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import ElementUI from "element-ui";
import NjElement from "@/plugins/index.js";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/index.scss";

Vue.use(ElementUI);
Vue.use(NjElement);

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});

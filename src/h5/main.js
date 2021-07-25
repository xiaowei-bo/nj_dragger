import Vue from "vue";
import App from "./index.vue";
import NjElement from "@/plugins/index.js";
import "@/style/index.scss";

Vue.use(NjElement);

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    render: h => h(App)
});

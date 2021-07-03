import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import ElementUI from "element-ui";
import VueDraggableResize from "vue-draggable-resizable-gorkys";
import NjElement from "@/plugins/index.js";
import "element-ui/lib/theme-chalk/index.css";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import "@/style/index.scss";

Vue.use(ElementUI);
Vue.use(NjElement);
Vue.component("VueDraggableResize", VueDraggableResize);
Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});

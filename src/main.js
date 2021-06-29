import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "@/style/index.scss";

import * as obj from "vue";
console.log(obj);

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount("#app");

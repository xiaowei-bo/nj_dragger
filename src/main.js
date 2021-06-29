import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import * as obj from "vue";
console.log(obj);

const app = createApp(App);
app.use(ElementPlus);
app.mount("#app");

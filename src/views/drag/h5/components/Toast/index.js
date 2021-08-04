import Toast from "./index.vue";
import Vue from "vue";
let instance = null;
let timer = null;

export const toastTip = (arg) => {
    let text = "";
    let time = 3;
    if (typeof arg === "string") {
        text = arg;
    } else {
        text = arg.text;
        time = arg.time;
    }
    const constructor = Vue.extend(Toast);
    const parent = document.body;
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    if (instance) { // 节点存在时开关,改变v-show就好，避免 次次重排
        instance.$mount().text = text;
        instance.$mount().show = true;
        timer = setTimeout(() => {
            instance.$mount().show = false;
            instance.$mount().text = "";
        }, time * 1000);
    } else {
        instance = new constructor({ text, time });
        instance.$mount().text = text;
        instance.$mount().show = true;
        parent && parent.appendChild(instance.$mount().$el);
        timer = setTimeout(() => {
            instance.$mount().show = false;
            instance.$mount().text = "";
        }, time * 1000);
    }
};

window.toastTip = toastTip;

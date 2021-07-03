/**
 * @desc 组件库入口
 */

import Text from "./Text/index.vue";
import Button from "./Button/index.vue";
import Image from "./Image/index.vue";

const components = [
    Text,
    Button,
    Image
];

const install = function(Vue) {
    if (install.installed) return;
    install.installed = true;
    components.map(component => Vue.component(component.name, component));
};

if (window && window.Vue) {
    // CDN 方式引入
    install(window.Vue);
}

export default {
    install,
    Text,
    Button,
    Image
};

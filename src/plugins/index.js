/**
 * @desc 组件库入口
 */

import Text from "./Text";
import Button from "./Button";
import Image from "./Image";

const components = [
    Text,
    Button,
    Image
]

const install = function (Vue) {
	if (install.installed) return;
	install.installed = true;
	components.map(component => Vue.component(component.name, component));
}

if(window && window.Vue) {
    // CDN 方式引入
    install(window.Vue);
}

export default {
    install,
    Text,
    Button,
    Image
}
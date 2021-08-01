import Component from "./index";
Component.install = Vue => {
    Vue.component(Component.name, Component);
};
export default Component;

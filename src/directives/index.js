import store from "../store/index";

export default {
    install(Vue) {
        /**
         * @description 当 input or textarea 聚焦/失焦时，改变标识以禁止/启用自定义监听键盘事件
         */
        Vue.directive("setDisableKeycode", {
            inserted: function(elPar) {
                const elInput = elPar.getElementsByTagName("input") && elPar.getElementsByTagName("input")[0];
                const elTextarea = elPar.getElementsByTagName("textarea") && elPar.getElementsByTagName("textarea")[0];
                const el = elInput || elTextarea;
                el.onfocus = () => {
                    store.dispatch("setDisableKeycode", true);
                };
                el.onblur = () => {
                    store.dispatch("setDisableKeycode", false);
                };
            }
        });
    }
};

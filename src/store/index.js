import Vue from "vue";
import Vuex from "vuex";
import drag from "./modules/drag";
import user from "./modules/user";

Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    modules: {
        namespaced: true,
        drag,
        user
    }
});

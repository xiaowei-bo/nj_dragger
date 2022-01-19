import { getUserInfo } from "@/api/user";

const state = {
    userInfo: {}
};

const mutations = {
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo;
    }
};

const getters = {
    userInfo: state => {
        return state.userInfo;
    }
};

const actions = {
    setUserInfo: async (context) => {
        const userInfo = await getUserInfo();
        if (!userInfo.id) return;
        context.commit("SET_USERINFO", userInfo);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};

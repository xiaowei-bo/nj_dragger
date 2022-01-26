import { getUserInfo, reportOnlineTime } from "@/api/user";
import { handlerInterval } from "@/utils";

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
        const INTERVAL_TIME = 5000;
        handlerInterval(() => {
            reportOnlineTime(INTERVAL_TIME);
        }, INTERVAL_TIME);
        context.commit("SET_USERINFO", userInfo);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};

const state = {
    allForm: [],
    disableKeycode: false,
    activityData: {}
};

const mutations = {
    SET_ALLFORM: (state, form) => {
        if (state.allForm.find(i => i.key === form.key)) return;
        state.allForm.push(form);
    },
    SET_DISABLEKEYCODE: (state, disableKeycode) => {
        state.disableKeycode = disableKeycode;
    },
    SET_ACTIVITYDATA: (state, activityData) => {
        state.activityData = activityData;
    }
};

const getters = {
    allForm: state => {
        return state.allForm;
    },
    disableKeycode: state => {
        return state.disableKeycode;
    },
    activityData: state => {
        return state.activityData;
    }
};

const actions = {
    setAllForm: (context, form) => {
        context.commit("SET_ALLFORM", form);
    },
    setDisableKeycode: (context, disableKeycode) => {
        context.commit("SET_DISABLEKEYCODE", disableKeycode);
    },
    setActivityData: (context, activityData) => {
        context.commit("SET_ACTIVITYDATA", activityData);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};

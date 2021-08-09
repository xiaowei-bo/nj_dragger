const state = {
    allForm: [],
    disableKeycode: false
};

const mutations = {
    SET_ALLFORM: (state, form) => {
        if (state.allForm.find(i => i.key === form.key)) return;
        state.allForm.push(form);
    },
    SET_DISABLEKEYCODE: (state, disableKeycode) => {
        state.disableKeycode = disableKeycode;
    }
};

const getters = {
    allForm: state => {
        return state.allForm;
    },
    disableKeycode: state => {
        return state.disableKeycode;
    }
};

const actions = {
    setAllForm: (context, form) => {
        context.commit("SET_ALLFORM", form);
    },
    setDisableKeycode: (context, disableKeycode) => {
        context.commit("SET_DISABLEKEYCODE", disableKeycode);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};

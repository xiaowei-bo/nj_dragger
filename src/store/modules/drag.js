const state = {
    allForm: []
};

const mutations = {
    SET_ALLFORM: (state, form) => {
        if (state.allForm.find(i => i.key === form.key)) return;
        state.allForm.push(form);
    }
};

const getters = {
    allForm: state => {
        return state.allForm;
    }
};

const actions = {
    setAllForm: (context, form) => {
        context.commit("SET_ALLFORM", form);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};

export const snackbar = {
  namespaced: true,
  state: () => ({
    display: false,
    message: ''
  }),
  mutations: {
    setDisplay: (state, display) => {
      state.display = display;
    },
    setMessage: (state, message) => {
      state.message = message;
    }
  },
  actions: {
    show: ({commit}, message) => {
      commit('setMessage', message);
      commit('setDisplay', true);
    }
  }
}
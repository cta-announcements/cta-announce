export const dialog = {
  namespaced: true,
  state: () => ({
    display: false,
    title: '',
    text: '',
    callback: () => {}
  }),
  mutations: {
    setDisplay: (state, display) => {
      state.display = display;
    },
    setTitle: (state, title) => {
      state.title = title;
    },
    setText: (state, text) => {
      state.text = text;
    },
    setCallback: (state, callback) => {
      state.callback = callback;
    }
  },
  actions: {
    show: ({commit}, {title, text, callback}) => {
      commit('setTitle', title);
      commit('setText', text);
      commit('setCallback', callback);
      commit('setDisplay', true);
    }
  }
}
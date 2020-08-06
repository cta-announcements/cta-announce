export const form = {
  namespaced: true,
  state: () => ({
    date: '',
    text: '',
    category: ''
  }),
  getters: {
    getTextWithoutExtraLineBreaks(state) {
      // removes line breaks where there are two or more
      // in a row, replacing them with just one
      return state.text.replace(/(\r\n|\r|\n){2,}/g, '$1\n');
    }
  },
  mutations: {
    setDate: (state, date) => {
      state.date = date;
    },
    setText: (state, text) => {
      state.text = text;
    },
    setCategory: (state, category) => {
      state.category = category;
    }
  }
}
export const form = {
  namespaced: true,
  state: () => ({
    date: '',
    text: '',
    category: ''
  }),
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
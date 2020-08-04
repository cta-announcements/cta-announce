const snackbar = {
  data: () => ({
    snackbar: false,
    snackbarMessage: ''
  }),
  methods: {
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = true;
    }
  }
}

export default snackbar;
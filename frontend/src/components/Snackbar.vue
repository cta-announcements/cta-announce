<template>
  <v-snackbar v-model="display">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <cta-button color="primary" text v-bind="attrs" @clicked="display = false">
        Close
      </cta-button>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  components: {
    ctaButton: () => import('./Button')
  },
  computed: {
    display: {
      get() {
        return this.$store.state.snackbar.display;
      },
      set(value) {
        this.$store.commit('snackbar/setDisplay', value);
      }
    },
    message() {
      return this.$store.state.snackbar.message;
    }
  }
};
</script>

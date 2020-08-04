<template>
  <v-snackbar v-model="display">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="primary" text v-bind="attrs" @click="display = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
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

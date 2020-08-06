<template>
  <v-dialog max-width="500" v-model="display">
    <v-card>
      <v-card-title class="text-h6">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-body-1">
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <cta-button @clicked="display = false" color="secondary" class="mr-4"
          >Cancel</cta-button
        >
        <cta-button @clicked="confirmed()">Okay</cta-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {
    ctaButton: () => import('./Button')
  },
  computed: {
    display: {
      get() {
        return this.$store.state.dialog.display;
      },
      set(value) {
        this.$store.commit('dialog/setDisplay', value);
      }
    },
    title() {
      return this.$store.state.dialog.title;
    },
    text() {
      return this.$store.state.dialog.text;
    },
    callback() {
       return this.$store.state.dialog.callback
    }
  },
  methods: {
    confirmed() {
      // call the clicked callback function
      this.callback();
    }
  }
};
</script>

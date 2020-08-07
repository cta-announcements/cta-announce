<template>
<v-container fluid>
  <v-row class="fill-height" align="start">
    <v-col class="text-h4 text-center" cols="12">
      <div class="text-h3 mb-6">😮</div>
      The page your are looking for does not exist.
      <cta-button to="/" class="mt-6">
        Take me home
      </cta-button>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  components: {
    ctaButton: () => import('../components/Button')
  }
};
</script>
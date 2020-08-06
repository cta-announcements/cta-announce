<template>
  <v-list-item two-line>
    <cta-icon color="blue">mdi-microphone</cta-icon>
    <v-list-item-content class="ml-4">
      <v-list-item-title class="text-h5">
        <strong>cta</strong> announce
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  components: {
    ctaIcon: () => import('../Icon')
  }
};
</script>

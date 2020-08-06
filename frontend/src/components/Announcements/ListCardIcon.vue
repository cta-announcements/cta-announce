<template>
  <v-sheet
    :color="color"
    height="100"
    width="100"
    elevation="6"
    rounded
  >
    <v-row class="fill-height" align="center" justify="center">
      <cta-icon color="white" large>
        <slot></slot>
      </cta-icon>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  components: {
    ctaIcon: () => import('../Icon')
  },
  inheritAttrs: true,
  props: {
    color: String
  }
};
</script>

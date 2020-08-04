<template>
  <v-sheet
    :color="color"
    height="100"
    width="100"
    elevation="6"
    rounded
  >
    <v-row class="fill-height" align="center" justify="center">
      <v-icon color="white" large>
        <slot></slot>
      </v-icon>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  inheritAttrs: true,
  props: {
    color: String
  }
};
</script>

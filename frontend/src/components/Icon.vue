<template>
  <v-icon :color="color" v-bind="$attrs">
    <slot></slot>
  </v-icon>
</template>

<script>
export default {
  inheritAttrs: true,
  props: {
    color: {
      type: String,
      default: 'secondary'
    }
  }
}
</script>
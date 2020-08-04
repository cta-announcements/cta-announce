<template>
<!-- Div allows for margin and padding without duplicate class key-->
  <div>
    <v-btn
      :color="success ? successColor : color"
      class="white--text font-weight-light"
      @click.stop="$emit('clicked')"
      :disabled="disabled"
    >
    <slot></slot>
    <div v-if="success">
      <slot name="success"></slot>
    </div>
    <div v-else>
      <slot name="normal"></slot>
    </div>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    success: {
      type: Boolean,
      default: false
    },
    successColor: {
      type: String,
      default: 'grey'
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
};
</script>
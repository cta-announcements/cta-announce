<template>
<!-- Div allows for margin and padding without duplicate class key-->
  <div>
    <v-btn
      :color="success ? successColor : color"
      class="white--text font-weight-light"
      @click.stop="$emit('clicked')"
      :disabled="disabled"
      :text="text"
      :to="to"
    >
    <slot></slot>
      <template v-if="success">
        <slot name="success"></slot>
      </template>
      <template v-else>
        <slot name="normal"></slot>
      </template>
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
    },
    text: Boolean,
    to: String
  }
};
</script>
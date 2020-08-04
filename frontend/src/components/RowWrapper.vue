<template>
  <!-- provides the proper gutters and alignment for page views -->
  <v-container fluid v-bind="$attrs">
    <v-row align="start" justify="center">
      <v-col cols="12" sm="10" md="8" lg="7" xl="6">
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  inheritAttrs: true
};
</script>

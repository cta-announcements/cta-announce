<template>
  <v-card :height="height">
    <v-row class="px-8">
      <!-- icon and title-->
      <v-col cols="12" class="mt-n6">
        <v-row>
          <v-sheet
            :color="color"
            height="100"
            width="100"
            elevation="6"
            rounded
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-icon color="white" large>
                <slot name="icon"></slot>
              </v-icon>
            </v-row>
          </v-sheet>
          <v-col>
            <div class="text-h6 pt-3 pl-2">
              <slot name="title"></slot>
            </div>
            <div class="text-subtitle-2 pl-2 mt-1 grey--text text--darken-1">
              <slot name="subtitle"></slot>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <slot></slot>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    color: String,
    height: String
  }
};
</script>

<style scoped>
.text-h6 {
  line-height: 1.3;
}
</style>

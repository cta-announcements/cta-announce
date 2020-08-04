<template>
  <v-list-item class="px-0" two-line>
    <v-list-item-avatar>
      <v-img :src="photoURL" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title
        class="grey--text text-h6"
      >
        <slot name="displayName"></slot>
      </v-list-item-title>
    </v-list-item-content>

  <!-- this is not very DRY, however, list-item-action needs to be a direct 
  child of list-item, so we can't just wrap it in a div -->
    <v-list-item-action v-if="isCurrentAdmin">
      <slot name="delete"></slot>
    </v-list-item-action>
    <v-list-item-action v-if="isCurrentAdmin">
      <slot name="approve"></slot>
    </v-list-item-action>

  </v-list-item>
</template>

<script>
export default {
  props: {
    photoURL: String
  },
  computed: {
    isCurrentAdmin() {
      return this.$store.getters['users/isCurrentAdmin'];
    }
  }
};
</script>
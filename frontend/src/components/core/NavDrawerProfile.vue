<template>
  <v-list nav v-if="currentUser">
    <v-divider />
    <v-list-item two-line class="mb-0">
      <v-list-item-avatar>
        <v-img :src="currentUser.photoURL" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle class="white--text">{{
          currentUser.displayName
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
  </v-list>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.getters['users/current'];
    }
  }
};
</script>

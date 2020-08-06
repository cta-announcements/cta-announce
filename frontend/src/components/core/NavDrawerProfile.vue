<template>
  <v-list nav v-if="currentUser">
    <v-divider />
    <cta-user :user="currentUser" class="my-1">
      <template v-slot:displayName="scope">
        <div class="text-display-1">
          {{ scope.displayName }}
        </div>
      </template>
    </cta-user>
    <v-divider />
  </v-list>
</template>

<script>
export default {
  components: {
    ctaUser: () => import('../User'),
  },
  computed: {
    currentUser() {
      return this.$store.getters['users/current'];
    },
    isCurrentUserAdmin() {
      console.log(this.$store.getters['users/isCurrentAdmin']);
      return this.$store.getters['users/isCurrentAdmin'];
    },
  },
};
</script>

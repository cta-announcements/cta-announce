<template>
  <cta-row-wrapper>
    <cta-user-created-list />
    <v-row>
      <v-col
        v-for="announcement in announcements"
        :key="announcement.id"
        class="mb-8 pt-0"
        cols="12"
      >
        <cta-list-card :announcement="announcement" />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="announcements.length === 0"
      ></v-progress-circular>
    </v-row>
  </cta-row-wrapper>
</template>

<script>
export default {
  components: {
    ctaListCard: () => import('../components/Announcements/ListCard.vue'),
    ctaRowWrapper: () => import('../components/RowWrapper'),
    ctaUserCreatedList: () =>
      import('../components/Announcements/UserCreatedList'),
  },
  computed: {
    announcements() {
      const isAdmin = this.$store.getters['users/isCurrentAdmin'];

      // admins see all unapproved and approved announcements.
      // this is so they can delete/approve them
      return isAdmin
        ? this.$store.getters['announcements/ordered']
        : this.$store.getters['announcements/displayedAndOrdered'];
    },
  },
};
</script>
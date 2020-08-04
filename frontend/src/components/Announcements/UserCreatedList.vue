<template>
  <div v-if="ownedByCurrentUser">
    <v-expansion-panels
      flat
      tile
      class="mb-8"
      v-model="openIndex"
    >
      <v-expansion-panel class="grey lighten-4">
        <v-expansion-panel-header class="text-h4 px-0">
          Your announcements
          <template v-slot:actions>
            <v-icon large>$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mx-n10">
          <v-list class="grey lighten-4">
            <cta-user-created-list-item
              v-for="announcement in ownedByCurrentUser"
              :key="announcement.id"
              :announcement="announcement"
            >
            </cta-user-created-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider class="mb-12"></v-divider>
  </div>
</template>

<script>
export default {
  data: () => ({
    openIndex: 0,
  }),
  components: {
    ctaUserCreatedListItem: () => import('./UserCreatedListItem'),
  },
  computed: {
    ownedByCurrentUser() {
      // it can either be undefined (there is no current user) or length 0
      // (the user has no announcements). We return both of these cases
      // as undefined
      const announcements = this.$store.getters['announcements/ownedByCurrentUser'];
      if (announcements) {
        if (announcements.length > 0) {
          return announcements;
        }
      }
      return undefined;
    },
  },
};
</script>

<style>
</style>
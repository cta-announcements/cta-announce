<template>
<div>
  <cta-card color="blue" max-height="500">
    <template #icon>
      mdi-shield-account
    </template>
    <template #title>
      Admins
    </template>

    <v-col cols="12">
      <v-list>
        <cta-user-list-item
          v-for="admin in adminList"
          :key="admin.uid"
          :user="admin"
        />
      </v-list>
    </v-col>
  </cta-card>
</div>
</template>

<script>
export default {
  components: {
    ctaCard: () => import('../Card'),
    ctaUserListItem: () => import('./UserListItem')
  },
  computed: {
    adminList() {
      return this.$store.getters['users/admins'];
    }
  }
};
</script>

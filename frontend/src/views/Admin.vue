<template>
  <v-container v-if="isAdmin" class="px-6">
    <v-row>
      <v-col cols="12" lg="6" class="mb-6">
         <cta-user-list></cta-user-list>
      </v-col>
       <v-col cols="12" lg="6">
         <cta-add-admin></cta-add-admin>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    ctaUserList: () => import('../components/Admin/UserList'),
    ctaAddAdmin: () => import('../components/Admin/AddAdmin')
  },
  computed: {
    isAdmin() {
      return this.$store.getters['users/isCurrentAdmin'];
    }
  },
  created() {
    this.$store.dispatch('users/fetchAllAdmins');
  }
}
</script>

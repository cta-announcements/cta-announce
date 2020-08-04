<template>
  <cta-user :user="user" @action-clicked="confirm()">
    <template #action-icon>
      mdi-delete
    </template>
  </cta-user>
</template>

<script>
import dialogMessages from '../../data/dialogMessages';
import snackbarMessages from '../../data/snackbarMessages'

export default {
  props: {
    user: Object
  },
  components: {
    ctaUser: () => import('./User')
  },
  methods: {
    confirm() {
      // the admin is trying to unadd themselves
      if (this.$store.getters['users/current'].uid === this.user.uid) {
        this.$store.dispatch('dialog/show', {
          ...dialogMessages.admin.unaddingSelf,
          callback: this.unaddAdmin
        });
      } else {
        this.unaddAdmin();
      }
    },
    unaddAdmin() {
      try {
        this.$store.dispatch('users/setAdminStatus', {
          user: this.user,
          newStatus: false
        });
      } catch (e) {
        console.error(e);
        this.$store.dispatch(
          'snackbar/show',
          snackbarMessages.admin.errorWhileUnadding
        );
      }
      this.$store.dispatch('snackbar/show',  snackbarMessages.admin.successUnadding);
      this.$store.commit('dialog/setDisplay', false);
    }
  }
};
</script>
<template>
  <cta-user :user="user" actions email class="px-0" two-line>

    <template v-slot:displayName="scope">
      <!-- default styling is okay in this instance -->
      {{scope.displayName}}
    </template>

    <template #actions>
      <v-list-item-action>
        <v-btn icon @click="confirm()">
           <cta-icon>mdi-delete</cta-icon>
        </v-btn>
      </v-list-item-action>
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
    ctaUser: () => import('../User'),
    ctaIcon: () => import('../Icon')
  },
  computed: {
    currentUser() {
      return this.$store.getters['users/current']
    }
  },
  methods: {
    confirm() {
      // the admin is trying to unadd themselves
      if (this.currentUser?.uid === this.user.uid) {
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
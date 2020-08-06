<template>
  <div>
    <cta-card color="green">
      <template #icon>
        mdi-plus
      </template>
      <template #title>
        Add Admin
      </template>
      <template #subtitle>
        Note: the user must have logged in <strong>at least once.</strong>
      </template>

      <v-col cols="12" class="mt-3 pb-0">
        <v-row>
          <v-text-field label="Email" outlined v-model="email">
            <template #append-outer>
              <v-icon color="grey" @click="searchUser()">
                mdi-magnify
              </v-icon>
            </template>
          </v-text-field>
        </v-row>
      </v-col>

      <v-col cols="12" class="pt-0 mb-4" v-if="user">
        <cta-user :user="user" email actions>
          <!-- no need to change style -->
          <template v-slot:displayName="scope">
            {{ scope.displayName }}
          </template>

          <template #actions>
            <v-list-item-action>
              <v-btn icon @click="addAdmin()" :disabled="user.admin">
                <v-icon color="grey">{{
                  user.admin ? 'mdi-check' : 'mdi-plus'
                }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </cta-user>
      </v-col>
      <v-col cols="12" v-else-if="email" class="pt-0 mb-4">
        No users found. Try clicking the search button.
      </v-col>
    </cta-card>
  </div>
</template>

<script>
import snackbarMessages from '../../data/snackbarMessages';

export default {
  data: () => ({
    email: '',
  }),
  components: {
    ctaCard: () => import('../Card'),
    ctaUser: () => import('../User'),
  },
  methods: {
    async searchUser() {
      if (!this.user && this.email) {
        try {
          const exists = await this.$store.dispatch(
            'users/fetchByEmail',
            this.emailLowerCase
          );
          if (!exists) {
            this.$store.dispatch(
              'snackbar/show',
              snackbarMessages.admin.userDoesNotExist
            );
          }
        } catch {
          this.$store.dispatch(
            'snackbar/show',
            snackbarMessages.errorWhileSearching
          );
        }
      }
    },
    addAdmin() {
      try {
        this.$store.dispatch('users/setAdminStatus', {
          user: this.user,
          newStatus: true,
        });
      } catch {
        this.$store.dispatch(
          'snackbar/show',
          snackbarMessages.errorWhileAdding
        );
      }
    },
  },
  computed: {
    user() {
      if (!this.email) return undefined;

      const user = this.$store.getters['users/getUserByEmail'](
        this.emailLowerCase
      );
      return user;
    },
    emailLowerCase() {
      return this.email.toLowerCase();
    },
  },
};
</script>

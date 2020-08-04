<template>
  <cta-row-wrapper>


    <!-- Same-day announcement notice -->
     <v-alert type="info" class="mb-12" v-if="beforeCutoff">
       Announcements submitted now will be read this morning
     </v-alert>

    <v-form v-model="valid" ref="form" lazy-validation>
      <!-- form sections -->

      <!-- Title -->
      <cta-card color="blue" class="mb-12">
        <template #title>Submit an Announcement</template>
        <template #icon>mdi-file-outline</template>
        <template #subtitle
          >Fill in the required fields below to have your announcement
          run.</template
        >
      </cta-card>

      <cta-form-section-user />
      <cta-form-section-meta />
      <cta-form-section-text />
    </v-form>

    <cta-button @clicked="validate()" :disabled="!valid">Submit</cta-button>
  </cta-row-wrapper>
</template>

<script>
import snackbarMessages from '../data/snackbarMessages';
import dialogMessages from '../data/dialogMessages';

export default {
  components: {
    ctaFormSectionUser: () => import('../components/Submit/FormSectionUser'),
    ctaFormSectionMeta: () => import('../components/Submit/FormSectionMeta'),
    ctaFormSectionText: () => import('../components/Submit/FormSectionText'),
    ctaButton: () => import('../components/Button'),
    ctaRowWrapper: () => import('../components/RowWrapper'),
    ctaCard: () => import('../components/Card')
  },
  data: () => ({
    valid: true
  }),
  computed: {
    loggedIn() {
      return this.$store.getters['users/current'];
    },
    isCurrentUserAdmin() {
      return this.$store.getters['users/isCurrentAdmin'];
    },
    beforeCutoff() {
      return (new Date().getHours() < 9);
    }
  },
  methods: {
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.showDialog();
      }
    },
    showDialog() {

      let message;
      if (this.isCurrentUserAdmin) {
        message = dialogMessages.submit.admin;
      } else if (this.beforeCutoff) {
        message = dialogMessages.submit.beforeCutoff;
      } else {
        message = dialogMessages.submit.normal;
      }

      this.$store.dispatch('dialog/show', {
        ...message,
        callback: this.submit
      });

    },
    async submit() {
     
      if (this.loggedIn) {

        try {
          this.$store.dispatch('announcements/create');
        } catch {
          this.$store.dispatch('snackbar/show', snackbarMessages.submit.error);
          this.$store.commit('dialog/setDisplay', false);
          return;
        }
        
        this.$store.dispatch('snackbar/show', snackbarMessages.submit.success);
        this.$refs.form.reset();

      } else {
        this.$store.dispatch('snackbar/show', snackbarMessages.submit.notSignedIn);
      }

      this.$store.commit('dialog/setDisplay', false);

    },
    login() {
      this.$store.dispatch('profile/logIn');
    }
  }
};
</script>

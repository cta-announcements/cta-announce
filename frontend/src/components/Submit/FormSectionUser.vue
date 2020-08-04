<template>
  <cta-card color="green" class="mb-12">
    <template #title>Identity</template>
    <template #icon>mdi-account-outline</template>
    <template #subtitle>Sign in with Google to let us know who you are.</template>
    <cta-input-wrapper>
      <cta-button
      @clicked="login()"
      :disabled="isLoggedIn"
      :success="isLoggedIn"
      elevation="0"
      >
        <v-icon left>mdi-google</v-icon>
        <template #success>
          signed in
        </template>
        <template #normal>
          sign in
        </template>
      </cta-button>
    </cta-input-wrapper>
  </cta-card>
</template>

<script>
export default {
  components: {
    ctaCard: () => import('../Card'),
    ctaInputWrapper: () => import('./InputWrapper'),
    ctaButton: () => import('../Button')
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['users/current'] !== undefined;
    }
  },
  methods: {
    login() {
      this.$store.dispatch('users/login');
    }
  }
};
</script>
<template>
  <cta-card color="blue" class="mb-8">
    <template #title>Message</template>
    <template #icon>mdi-pencil-outline</template>
    <template #subtitle
      >Write your announcement below. Keep it breif and to the point.
    </template>
    <cta-input-wrapper>
      <v-textarea
        outlined
        auto-grow
        v-model="text"
        :rules="[$options.rules.required, $options.rules.text]"
        counter="500"
      >
      </v-textarea>
    </cta-input-wrapper>
  </cta-card>
</template>

<script>
import rules from '../../data/rules';

export default {
  components: {
    ctaCard: () => import('../Card'),
    ctaInputWrapper: () => import('./InputWrapper')
  },
  computed: {
    text: {
      get() {
        return this.$store.state.form.text;
      },
      set(val) {
        this.$store.commit('form/setText', val);
      }
    }
  },
  created() {
    this.$options.rules = rules;
  }
};
</script>

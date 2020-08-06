<template>
  <cta-card color="blue" class="mb-8">
    <template #title>Message</template>
    <template #icon>mdi-pencil-outline</template>
    <template #subtitle
      >Write your announcement below. Keep it breif and to the point.
    </template>
    <cta-input-wrapper>
      <!-- we need a custom textarea rather than vue's default to prevent 
      scroll jumping, as per https://github.com/vuetifyjs/vuetify/issues/5314 -->
     <cta-text-area/>
    </cta-input-wrapper>
  </cta-card>
</template>

<script>
export default {
  components: {
    ctaCard: () => import('../Card'),
    ctaInputWrapper: () => import('./InputWrapper'),
    ctaTextArea: () => import('./Textarea')
  }
};
</script>

<template>
  <v-badge
    :icon="$options.badgeIcon"
    :value="showBadge"
    overlap
    color="secondary"
    class="my-4"
    :class="showBadge ? 'mr-6' : 'mr-4'"
  >
    <v-avatar size="40">
      <v-img :src="photoURL" />
    </v-avatar>
  </v-badge>
</template>

<script>
export default {
  props: {
    photoURL: String,
    showBadge: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.$options.badgeIcon = 'mdi-shield-outline';
  },
};
</script>
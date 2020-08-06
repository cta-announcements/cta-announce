<template>
  <v-badge
    :value="showBadge"
    overlap
    color="secondary darken-4"
    class="my-4"
    :class="showBadge ? 'mr-6' : 'mr-4'"
    
  >
    <template #badge>
      <!-- You would be right to say that specifying the icon in the icon prop 
      would be more efficient. However, for reasons I do not know, this casues a bug only 
      in production. When switching routes, all the badge icons will grow to their
      default size. This bug aslo occurs when the <v-icon></v-icon> componenet does not
      explicitily have its size set. It also will change its colour to black if it is not
      set to white -->
      <cta-icon x-small color="white">mdi-shield-outline</cta-icon>
    </template>
    <v-avatar size="40">
      <v-img :src="photoURL" />
    </v-avatar>
  </v-badge> 
</template>

<script>
export default {
  components: {
    ctaIcon: () => import('./Icon')
  },
  props: {
    photoURL: String,
    showBadge: {
      type: Boolean,
      default: false
    }
  }
};
</script>
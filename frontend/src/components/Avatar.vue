<template>
  <v-badge
    :value="showBadge"
    overlap
    color="secondary"
    class="my-4"
    :class="showBadge ? 'mr-6' : 'mr-4'"
    
  >
    <template #badge>
      <!-- You would be right to say that specifying the icon in the icon prop 
      would be more efficient. However, for reasons I do not know, this casues a bug only 
      in production. When switching routes, all the badge icons will grow to their
      default size. This bug aslo occurs when the <v-icon></v-icon> componenet does not
      explicitily have its size set. -->
      <v-icon x-small>mdi-shield-outline</v-icon>
    </template>
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
  }
};
</script>
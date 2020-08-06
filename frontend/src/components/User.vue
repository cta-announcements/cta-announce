<template>
<!-- will only display once the user has been fetched -->
<!-- v-list-item also inherits all class/style bindings -->
<v-list-item v-if="user" v-bind="$attrs">
  <cta-avatar :photoURL="user.photoURL" :showBadge="user.admin"/>
  
  <v-list-item-content>
    <v-list-item-title>
      <!-- bind the dislay name so parents can style it however they need -->
      <slot name="displayName" v-bind:displayName="user.displayName"></slot>
    </v-list-item-title>
    <v-list-item-subtitle v-if="email">
      {{user.email}}
    </v-list-item-subtitle>
  </v-list-item-content>
  
  <!-- bind user scope -->
  <template v-if="actions">
    <slot name="actions" v-bind:user="user"></slot>
  </template> 
</v-list-item>
</template>

<script>
export default {
  inheritAttrs: true,
  components: {
    ctaAvatar: () => import('./Avatar')
  },
  props: {
    user: Object,
    email: Boolean,
    actions: Boolean
  }
};
</script>

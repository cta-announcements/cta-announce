<template>
  <v-list-item class="px-0">
    <v-list-item-avatar>
      <v-img :src="user.photoURL" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        {{ user.displayName }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ user.email }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click.stop="$emit('action-clicked')" :disabled="disabled">
        <v-icon color="grey lighten-1">
          <slot name="action-icon"></slot>
        </v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
 props: {
   user: Object,
   disabled: Boolean
 }
}
</script>
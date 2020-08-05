<template>
  <v-list-item class="px-0" two-line>
    <v-list-item-avatar>
      <v-img :src="photoURL" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title class="grey--text text-h6">
        <slot name="displayName"></slot>
      </v-list-item-title>
    </v-list-item-content>

    <!-- this gets wrapped in a template as v-list-item-action needs to be a direct child of
    v-list-item and a div would mess that up -->
    <template v-if="isCurrentUserAdmin">
      <v-list-item-action>
        <v-btn icon @click="confirmAnnouncementDelete()">
          <v-icon color="grey">mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action>
        <cta-button
          @clicked="toggleAnnouncementDisplay()"
          :success="announcement.display"
          successColor="green"
        >
          <v-icon left>mdi-check</v-icon>
          <template #success>
            approved
          </template>
          <template #normal>
            approve
          </template>
        </cta-button>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
import dialogMessages from '../../data/dialogMessages';

export default {
  components: {
    ctaButton: () => import('../Button'),
  },
  props: {
    photoURL: String,
    announcement: Object,
  },
  computed: {
    isCurrentUserAdmin() {
      return this.$store.getters['users/isCurrentAdmin'];
    }
  },
  methods: {
    toggleAnnouncementDisplay() {
      this.$store.dispatch('announcements/updateDisplay', {
        display: !this.announcement.display,
        id: this.announcement.id,
      });
    },
    confirmAnnouncementDelete() {
      this.$store.dispatch('dialog/show', {
        ...dialogMessages.announcements.delete,
        callback: this.deleteAnnouncement,
      });
    },
    deleteAnnouncement() {
      this.$store.dispatch('announcements/delete', this.announcement.id);
      this.$store.commit('dialog/setDisplay', false);
    },
  },
};
</script>
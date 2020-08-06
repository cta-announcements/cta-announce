<template>
  <cta-user class="px-0" :user="user" :actions="isCurrentUserAdmin">
    <template v-slot:displayName="scope">
      <div class="secondary--text text-h6">
        {{ scope.displayName }}
      </div>
    </template>

    <template #actions>
      <v-list-item-action>
        <v-btn icon @click="confirmAnnouncementDelete()">
          <cta-icon>mdi-delete</cta-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action>
        <cta-button
          @clicked="toggleAnnouncementDisplay()"
          :success="announcement.display"
          successColor="green"
        >
          <cta-icon left color="white" size="24">mdi-check</cta-icon>
          <template #success>
            approved
          </template>
          <template #normal>
            approve
          </template>
        </cta-button>
      </v-list-item-action>
    </template>
  </cta-user>
</template>

<script>
import dialogMessages from '../../data/dialogMessages';

export default {
  components: {
    ctaButton: () => import('../Button'),
    ctaUser: () => import('../User'),
    ctaIcon: () => import('../Icon')
  },
  props: {
    photoURL: String,
    announcement: Object,
  },
  computed: {
    isCurrentUserAdmin() {
      return this.$store.getters['users/isCurrentAdmin'];
    },
    user() {
      return this.$store.getters['users/getByUid'](this.announcement.authorUid);
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
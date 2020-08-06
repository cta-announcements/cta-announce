<template>
  <v-list-item>
    <v-list-item-icon>
      <cta-icon>{{ categoryIcon }}</cta-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ announcement.category }}
      </v-list-item-title>
      <v-list-item-subtitle class="mr-4">
        {{ announcement.text }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="confirmDelete()">
        <cta-icon>
          mdi-delete
        </cta-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-action>
      <v-chip :color="chipColor" class="white--text">
        <cta-icon left color="white" class="mr-2">{{ chipIcon }}</cta-icon>
        {{ chipText }}
      </v-chip>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import categories from '../../data/categories';
import snackbarMessages from '../../data/snackbarMessages';
import dialogMessages from '../../data/dialogMessages';

export default {
  props: {
    announcement: Object,
  },
  components: {
    ctaIcon: () => import('../Icon'),
  },
  computed: {
    categoryIcon() {
      return categories[this.announcement.category].icon;
    },
    chipText() {
      return this.announcement.display ? 'Approved' : 'Pending';
    },
    chipColor() {
      return this.announcement.display ? 'primary' : 'secondary';
    },
    chipIcon() {
      return this.announcement.display
        ? 'mdi-check-circle'
        : 'mdi-clock-outline';
    },
  },
  methods: {
    async confirmDelete() {
      await this.$store.dispatch('dialog/show', {
        ...dialogMessages.announcements.delete,
        callback: this.deleteAnnouncement,
      });
    },
    async deleteAnnouncement() {
      try {
        await this.$store.dispatch(
          'announcements/delete',
          this.announcement.id
        );
      } catch {
        await this.$store.dispatch(
          'snackbar/show',
          snackbarMessages.announcements.deleteFailed
        );
      }
      await this.$store.dispatch(
        'snackbar/show',
        snackbarMessages.announcements.deleteSucceeded
      );
      this.$store.commit('dialog/setDisplay', false);
    },
  },
};
</script>

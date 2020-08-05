<template>
  <cta-card :color="category.color">
    <template #icon>
      {{ category.icon }}
    </template>

    <template #subtitle>
    <div class="text-right text-h6 grey--text">
      Expires {{expiryDate}}
    </div>
    </template>

    <v-col cols="12">
      <div class="text-h6">
        {{ announcement.text }}
      </div>
    </v-col>

    <v-col cols="12">
      <!-- announcements and their authors are loaded in seperately -->
      <cta-list-card-footer
        :photoURL="author.photoURL"
        v-if="author"
        :announcement="announcement"
      >
        <template #displayName>{{ author.displayName }}</template>

      </cta-list-card-footer>
    </v-col>
  </cta-card>
</template>

<script>
import categories from '../../data/categories';

export default {
  components: {
    ctaCard: () => import('../Card'),
    ctaListCardFooter: () => import('./ListCardFooter')
  },
  props: {
    announcement: Object
  },
  computed: {
    expiryDate() {
      const expiry = this.announcement.expiry.toDate();
      
      // if the expiry date is today, we return 'Today'
      if (expiry.getDate() === new Date().getDate()) {
        return 'later today'
      }
      // otherwise we return a formatted date string
      return expiry.toLocaleDateString('en-CA', {
        month: 'short',
        day: 'numeric'
      });

    },
    category() {
      return categories[this.announcement.category];
    },
    author() {
      return this.$store.getters['users/getByUid'](this.announcement.authorUid);
    }
  },
  created() {
    if (!this.author) {
      this.$store.dispatch('users/fetchByUid', this.announcement.authorUid);
    } 
  }
};
</script>

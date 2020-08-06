<template>
<v-lazy :options="{threshold: .1}" min-height="200" transition="fade-transition">
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
        :announcement="announcement"
      />
    </v-col>
  </cta-card>
</v-lazy>
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
    }
  },
  created() {
    // we send out a request for the current user
    this.$store.dispatch('users/fetchByUid', this.announcement.authorUid);
  }
};
</script>

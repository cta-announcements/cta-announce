<template>
  <v-dialog v-model="model" max-width="500">
    <v-card>
      <!-- title -->
      <v-card-title class="text-h5">
        {{ announcement.category }}
      </v-card-title>
      <v-card-subtitle class="text-subtitle-1 pt-2 pb-1">
        <div>
          <cta-icon left>
            mdi-calendar-plus
          </cta-icon>
          Created {{ createdDate }}
        </div>
        <div>
          <cta-icon left>
            mdi-calendar-clock
          </cta-icon>
          Expires: {{ expiryDate }}
        </div>
      </v-card-subtitle>

      <!-- text -->
      <v-card-text class="text-body-1 pt-2">
        {{ announcement.text }}
      </v-card-text>

      <!-- actions -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <cta-button color="secondary" text @clicked="model = false">
          Close
        </cta-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import categories from '../../data/categories';

export default {
  components: {
    ctaIcon: () => import('../Icon'),
    ctaButton: () => import('../Button'),
  },
  props: {
    announcement: Object,
    value: Boolean,
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    expiryDate() {
      return this.announcement.expiry
        .toDate()
        .toLocaleString(this.$options.dateLocale, this.$options.dateOptions);
    },
    createdDate() {
      return this.announcement.created
        .toDate()
        .toLocaleString(this.$options.dateLocale, this.$options.dateOptions);
    },
    categoryIcon() {
      return categories[this.announcement.category].icon;
    },
  },
  created() {
    // date options
    this.$options.dateOptions = { month: 'short', day: 'numeric' };
    this.$options.dateLocale = 'en-CA';
  },
};
</script>

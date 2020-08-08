<template>
  <cta-card color="red" class="mb-12">
    <template #title>Expiry Date and Category</template>
    <template #icon>mdi-clock-outline</template>
    <template #subtitle>
      Note: the longest an announcement can be run is
      {{ $options.maxRunTimeInDays }} days.
    </template>

    <cta-input-wrapper>
      <v-select
        :items="$options.categories"
        label="Category"
        :rules="[$options.rules.required]"
        v-model="category"
        outlined
        :menu-props="{ maxHeight: 500 }"
      ></v-select>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :rules="[$options.rules.required]"
            label="Expiry"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          scrollable
          v-model="date"
          :min="minDate"
          :max="maxDate"
          locale="en-CA"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </cta-input-wrapper>
  </cta-card>
</template>

<script>
import categories from '../../data/categories';
import expiryConstants from '../../data/expiryConstants';
import rules from '../../util/rules';
import toISODate from '../../util/toISODate'

export default {
  data: () => ({
    menu: false,
  }),
  components: {
    ctaCard: () => import('../Card'),
    ctaInputWrapper: () => import('./InputWrapper'),
  },
  methods: {
    isPastCutoffHour(date) {
      return date.getHours() >= expiryConstants.cutoffHour;
    }
  },
  computed: {
    category: {
      get() {
        return this.$store.state.form.category;
      },
      set(val) {
        this.$store.commit('form/setCategory', val);
      },
    },
    date: {
      get() {
        return this.$store.state.form.date;
      },
      set(val) {
        this.$store.commit('form/setDate', val);
      },
    },
    maxDate() {
      const now = new Date();

      // if the time is after 9 AM, the max allowed date
      // should be plus 11, to keep the maximum run time at 10 days.
      if (this.isPastCutoffHour(now)) {
        now.setDate(now.getDate() + this.$options.maxRunTimeInDays + 1);

        // utility which returns ISO String in current timezone
        return toISODate(now);
      }

      // otherwise the span is 10 days
      now.setDate(now.getDate() + this.$options.maxRunTimeInDays);
      return toISODate(now);
    },
    minDate() {
      // announcements can only be submitted same-day before 9:00 AM
      // as this is when announcements typically get read. After 9:00 AM
      // we dissalow expiry dates on the same day
      const now = new Date();
      if (this.isPastCutoffHour(now)) {
        now.setDate(now.getDate() + 1);
        return toISODate(now);
      }
      // otherwise the min date is just the current one
      now.setDate(now.getDate())
      return toISODate(now);
    },
  },
  created() {
    // assign static data
    this.$options.categories = Object.keys(categories);
    this.$options.rules = rules;
    this.$options.maxRunTimeInDays = expiryConstants.maxRuntimeInDays;
  },
};
</script>

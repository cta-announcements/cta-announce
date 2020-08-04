<template>
  <cta-card color="red" class="mb-12">
    <template #title>Expiry Date and Category</template>
    <template #icon>mdi-clock-outline</template>
    <template #subtitle>
      Note: the longest an announcement can be run is {{$options.maxRunTimeInDays}} days.
    </template>

    <cta-input-wrapper>
      <v-select
        :items="$options.categories"
        label="Category"
        :rules="[$options.rules.required]"
        v-model="category"
        outlined
        :menu-props="{maxHeight: 500}"
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
import rules from '../../data/rules';

export default {
  data: () => ({
    menu: false,
    now: new Date()
  }),
  components: {
    ctaCard: () => import('../Card'),
    ctaInputWrapper: () => import('./InputWrapper')
  },
  computed: {
    category: {
      get() {
        return this.$store.state.form.category;
      },
      set(val) {
        this.$store.commit('form/setCategory', val);
      }
    },
    date: {
      get() {
        return this.$store.state.form.date;
      },
      set(val) {
        this.$store.commit('form/setDate', val);
      }
    },
    isPastCutoffHour() {
      return this.now.getHours() >= this.$options.cutoffHour;
    },
    maxDate() {
      // use the nowCopy getter to avoid mutating the now data property
      const nowCopy = new Date(this.now);
      

      // if the time is after 9 AM, the max allowed date
      // should be plus 11, to keep the maximum run time at 10 days.
      if (this.isPastCutoffHour) {
        nowCopy.setDate(nowCopy.getDate() + this.$options.maxRunTimeInDays + 1);
        return nowCopy.toISOString();
      }
      // otherwise the span is 10 days
      nowCopy.setDate(nowCopy.getDate() + this.$options.maxRunTimeInDays);
      return nowCopy.toISOString();
    },
    minDate() {
      // announcements can only be submitted same-day before 9:00 AM
      // as this is when announcements typically get read. After 9:00 AM
      // we dissalow expiry dates on the same day
      if (this.isPastCutoffHour) {
        const nowCopy = new Date(this.now);
        nowCopy.setDate(nowCopy.getDate() + 1);       
        return nowCopy.toISOString();
      }
      return this.now.toISOString();
    }
  },
  created() {
    // assign static data
    this.$options.categories = Object.keys(categories);
    this.$options.rules = rules;
    this.$options.maxRunTimeInDays = 10;
    this.$options.cutoffHour = 8; 

    // update the now object every minute
    setInterval(() => this.now = new Date(), 1000 * 60);
  }
};
</script>

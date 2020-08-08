<template>
  <v-carousel-item
    :transition="$options.transitionType"
    :reverse-transition="$options.transitionType"
  >
    <v-row class="fill-height ml-2" align="center">
      <v-col cols="11" class="pl-8">
        <v-list-item class="mb-2" two-line>

      
          <!-- Author field -->
          <v-list-item-avatar size="80">
            <v-img :src="photoURL" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle class="text-h3">
              {{ displayName }}
            </v-list-item-subtitle>

          <!-- Anouncement field -->
            <v-list-item-subtitle>
              <v-chip class="text-h4 secondary--text text--lighten-4" :color="categoryColor">
                <cta-icon large left color="white">
                  {{ categoryIcon }}
                </cta-icon>
                {{ announcement.category }}
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <div class="text-h3 white--text line-height px-4">
          {{ announcement.text }}
        </div>
      </v-col>
    </v-row>
  </v-carousel-item>
</template>

<script>
import categories from '../../data/categories';

export default {
  props: {
    announcement: Object,
  },
  components: {
    ctaIcon: () => import('../Icon')
  },
  computed: {
    categoryIcon() {
      return categories[this.announcement.category].icon;
    },
    author() {
      return this.$store.getters['users/getByUid'](this.announcement.authorUid);
    },
    categoryColor() {
      return categories[this.announcement.category].color;
    },
    photoURL() {
      return this.author?.photoURL;
    },
    displayName() {
      return this.author?.displayName;
    }
  },
  created() {
    // transition type option
    this.$options.transitionType = 'fade-transition';
  },
};
</script>

<style scoped>
.line-height {
  line-height: 1.3;
}
</style>
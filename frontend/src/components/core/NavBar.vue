<template>
  <div v-if="!hideNav">
    <v-app-bar app flat :color="breakpoint.mdAndUp ? 'transparent' : ''">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="!breakpoint.mdAndUp"
      />
    </v-app-bar>

    <v-navigation-drawer
      app
      dark
      v-model="drawer"
      :permanent="breakpoint.mdAndUp"
    >
      <!-- app title -->
      <cta-drawer-title />

      <!-- image slot -->
      <template #img>
        <v-img
          :src="$options.mountainImage"
          height="100%"
          gradient="to bottom, rgba(0,0,0, 0.7), rgba(0,0,0,0.5)"
        />
      </template>

      <!-- list and profile -->
        <cta-drawer-profile />
        <cta-nav-drawer-list />

    </v-navigation-drawer>
  </div>
</template>

<script>
import mountainImage from '../../assets/mountains.jpeg'

export default {
  components: {
    ctaDrawerTitle: () => import('./NavDrawerTitle'),
    ctaDrawerProfile: () => import('./NavDrawerProfile'),
    ctaNavDrawerList: () => import('./NavDrawerList')
  },
  data: () => ({
    hideNav: false,
    drawer: false
  }),
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint;
    },
  },
  created() {
    // only hide the navigation if this link was directly navigated to
    if (this.$route.path === '/display') {
      this.hideNav = true;
    }

    // load the mountain image as static data
    this.$options.mountainImage = mountainImage;
  }
};
</script>
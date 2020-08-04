<template>
  <v-app>
    <cta-nav-bar />
    <cta-snackbar/>
    <cta-dialog/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { auth } from './firebase';

export default {
  name: 'App',
  components: {
    ctaNavBar: () => import('./components/core/NavBar'),
    ctaSnackbar: () => import('./components/Snackbar'),
    ctaDialog: () => import('./components/Dialog')
  },
  created() {
    // register listener
    this.$store.dispatch('announcements/bindRef');

    // fetch the user profile sdetails
    if (auth.currentUser) {
      this.$store.dispatch('users/fetchByUid', auth.currentUser.uid);
    }

  },
  beforeDestroy() {
    this.$store.dispatch('announcements/unbindRef');
  }
};
</script>

<style>
/* Custom app background colour and font */
.v-application {
  background-color: var(--v-background-base) !important;
}

/* This is a temporary hack. Currently vuetify will destroy compilation times
(from around 40 sec -> 6 min) when using custom sass/scss variables. So for now, 
we just set all of these manually */

.text-h6,
.text-h5,
.text-h4,
.text-h3,
.text-h2,
.text-h1,
.text-body-1,
.text-body-2,
.text-subtitle-1,
.text-subtitle-2 {
  font-weight: 300 !important;
}
</style>

<template>
  <v-container class="white--text fill-height background" fluid>
    <v-row class="fill-height" align="center">
      <v-col cols="8" class="height">
        <cta-announcements-card/>
      </v-col>
      <v-col cols="4" class="height">
        <v-row class="fill-height">
          <v-col cols="12" class="pt-0 pb-0">
            <cta-instagram/>
          </v-col>
          <v-col cols="12 pb-0">
            <cta-weather-card/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    ctaAnnouncementsCard: () => import('../components/Display/AnnouncementsCard'),
    ctaWeatherCard: () => import('../components/Display/WeatherCard'),
    ctaInstagram: () => import('../components/Display/Instagram')
  }
};
</script>

<style scoped>
.background {
  background-image: url('https://images.unsplash.com/photo-1507992781348-310259076fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80');
  background-size: cover;
}
.height {
  height: 85vh;
}
</style>
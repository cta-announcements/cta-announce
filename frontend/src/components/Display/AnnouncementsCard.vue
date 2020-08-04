<template>
  <cta-card>
    <v-carousel
      v-model="currentAnnouncement"
      :show-arrows="false"
      height="100%"
      hide-delimiters
    >
      <cta-announcements-card-item
        v-for="announcement in announcements"
        :key="announcement.id"
        :announcement="announcement"
      />
    </v-carousel>
  </cta-card>
</template>

<script>
export default {
  components: {
    ctaCard: () => import('./Card'),
    ctaAnnouncementsCardItem: () => import('./AnnouncementsCardItem'),
  },
  data: () => ({
    currentAnnouncement: 0,
    timeout: undefined,
  }),
  computed: {
    announcements() {
      return this.$store.getters['announcements/displayed'];
    },
  },
  methods: {
    nextAnnouncement() {
      // if the length of the announcements array is just one
      // we can return. When more announcements are added, this function
      // will be called again and can register a new setTimeout event
      if (this.announcements.length === 1) {
        return;
      }

      // make sure that we are not exceeding the length of the
      // announcement array before we increment it.
      if (this.currentAnnouncement + 1 > this.announcements.length - 1) {
        this.currentAnnouncement = 0;
      } else {
        this.currentAnnouncement++;
      }

      const announcement = this.announcements[this.currentAnnouncement];

      // calculate the reading time for the current announcement.
      // the average reading speed of a person is around 225 wpm.
      // Therefore, the time in seconds for each word is 1/255 * 60
      // or about 0.25s. We also add a minimum time to the announcement
      // so a three word announcement does not go by in 0.75s.
      const minTime = 3;
      const secondsPerWord = 0.25;
      const numberOfWords = announcement.text.split(' ').length;
      const readingTimeInSeconds = numberOfWords * secondsPerWord + minTime;

      // call this function to advance the current announcement counter
      // after the computed reading time has passed
      this.timeout = setTimeout(
        this.nextAnnouncement,
        readingTimeInSeconds * 1000
      );
    },
  },
  watch: {
    announcements(newValue) {
      // this watcher lets us react to state changes, mainly when
      // announcements are first populated, in order to start or stop the timer.
      if (newValue.length > 0 && !this.timeout) {
        // start the announcement timer
        this.nextAnnouncement();
      } else if (this.timeout && newValue.length === 0) {
        // stop the announcement timer as there are no announcements
        clearTimeout(this.timeout);
      }
    },
  },
  created() {
    // although in most cases the announcements will not have been loaded
    // before this route is navigated to (i.e. the announcement display usually
    // directly loads this route), sometimes they could be. In this case, if there are
    // already announcements we can call nextAnnouncement() aswell
    if (this.announcements.length > 1) {
      this.nextAnnouncement();
    }
  },
};
</script>

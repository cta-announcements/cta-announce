<template>
  <cta-card>
    <v-row class="fill-height" align="center">
      <v-card-text class="text-h1">
        <v-row class="pl-6" align="center">
          <v-col cols="5">{{ temp }}&deg;C</v-col>
          <v-col cols="4">
            <v-icon size="128">{{ weatherIcon }}</v-icon>
          </v-col>
          <v-col cols="12" class="text-h4">
            {{ date }} | Day
            <strong>{{ day }}</strong>
            | {{ time }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-row>
  </cta-card>
</template>

<script>
import weatherIcons from '../../data/weather'

export default {
  components: {
    ctaCard: () => import('./Card')
  },
  data: () => ({
    now: new Date(),
    temp: 0,
    icon: '01'
  }),
  computed: {
    weatherIcon() {
      return weatherIcons[this.icon];
    },
    date() {
      return this.now.toLocaleDateString('en-CA', {
        month: 'short',
        day: 'numeric'
      });
    },
    time() {
      return this.now
        .toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
        .replace(/^0+/, '');
    },
    day() {
      if (this.now.getDate() % 2 === 0) {
        return 'two';
      }
      return 'one';
    }
  },
  methods: {
    startClockLoop() {
      // initally sync the system clock and our clock
      let timeout = 60 - this.now.getSeconds();

      setTimeout(() => {
        // once the timer has been set we only need to update the current time once every 60 seconds
        const updateTime = () => (this.now = new Date());
        updateTime();
        setInterval(updateTime, 60 * 1000);
      }, timeout * 1000);
    },
    updateWeather() {
      // constants for use with open weather map's api
      const apiKey = '490e328ebea9a7cefb214cc1f048e64a';
      const cityId = '6167865';
      const units = 'metric';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=${units}`;

      // fetch the current weather then update the values in data
      fetch(apiUrl).then(value => {
        value.json().then(response => {
          this.temp = Math.round(response.main.feels_like);

          // remove the night/day letter at the end of the icon string
          this.icon = response.weather[0].icon.substring(0, 2);
        });
      });

      setInterval(this.updateWeather, 1000 * 60 * 30);
    }
  },
  created() {
    // start the clock shown below the weather on a 60s update loop
    this.startClockLoop();
    // start the weather polling on a 30 min loop
    this.updateWeather();
  }
};
</script>
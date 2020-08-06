import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

// allow a custom background colour
export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        background: colors.grey.lighten4,
        primary: colors.blue,
        secondary: colors.grey
      }
    },
    dark: false
  }
});

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import { auth } from './firebase';

Vue.config.productionTip = false

let app;
auth.onAuthStateChanged(() => {

  // load the vue instance if it does not already exist
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


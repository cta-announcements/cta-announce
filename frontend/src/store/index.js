import Vue from 'vue'
import Vuex from 'vuex'

import { vuexfireMutations } from 'vuexfire'

import { announcements } from './modules/announcements'
import { users } from './modules/users'
import { form } from './modules/form'
import { snackbar } from './modules/snackbar'
import { dialog } from './modules/dialog'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    announcements,
    users,
    form,
    snackbar,
    dialog
  },
  mutations: vuexfireMutations
})

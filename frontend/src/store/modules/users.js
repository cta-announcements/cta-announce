import { collections, auth, authProvider } from '../../firebase'

import Vue from 'vue'
import inflight from '../../util/inflight'

export const users = {
  namespaced: true,
  state: () => ({
    currentAuthUser: {},
    items: [
    ]
  }),
  getters: {
    getByUid: (state) => (uid) => {
      return state.items.find(user => user.uid === uid);
    },
    getUserByEmail: (state) => (email) => {
      const user = state.items.find(user => user.email.includes(email));
      return user;
    },
    current: (state) => {
      return state.items.find(user => user.uid === state.currentAuthUser?.uid);
    },
    isCurrentAdmin: (state, getters) => {
      return getters.current?.admin;
    },
    admins: (state) => {
      return state.items.filter(user => user.admin);
    }
  },
  mutations: {
    add: (state, { user, uid }) => {
      // add the uid as non-enumerable
      Object.defineProperty(user, 'uid', {
        value: uid
      });
      state.items.push(user);
    },
    setAdmin: (state, { user, isAdmin }) => {
      Vue.set(user, 'admin', isAdmin);
    },
    setCurrentAuthUser: (state, auth) => {
      state.currentAuthUser = auth;
    }
  },
  actions: {
    fetchByUid: ({ commit }, uid) => {

      // inflight is a small utility function which keeps track of 
      // promises and prevents async duplication
      return inflight.new(uid, async () => {

        const snapshot = await collections.users.doc(uid).get();

        // if the user exists, commit them
        if (snapshot.exists) {
          const user = snapshot.data();
          commit('add', { user, uid });
          return true;
        }

        return false;
      })
    },

    fetchByEmail: async ({ commit, getters }, email) => {
      const snapshot = await collections.users
        .where('email', '==', email)
        .get();

      if (!snapshot.empty) {

        // due to the way this operation works, we don't need to use inflight.
        // This is because all of the data is downloaded ahead of time, and we 
        // can just check the state. 
        snapshot.forEach(user => {
          if (!getters.getByUid(user.id)) {
            commit('add', { user: user.data(), uid: user.id });
          }
        });
        return true;
      }
      return false;
    },

    fetchAllAdmins: async ({ commit, getters }) => {
      const snapshot = await collections.users.where('admin', '==', true).get();
      snapshot.forEach(admin => {

        // due to the way this operation works, we don't need to use inflight.
        // This is because all of the data is downloaded ahead of time, and we 
        // can just check the state. 
        if (!getters.getByUid(admin.id)) {
          commit('add', { user: admin.data(), uid: admin.id })
        }
      })
    },

    setAdminStatus: ({ commit }, { user, newStatus }) => {
      collections.users.doc(user.uid).update({
        admin: newStatus
      });
      commit('setAdmin', { user, isAdmin: newStatus });
    },

    create: async ({ commit }, { user, uid }) => {
      // attach the admin property as false. In order to maintain security
      // all users created client side will need to have: 
      // a) a profile with their own uid, email, and display name
      // b) all required fields, and 
      // c) not be setting the admin field = true
      // if any of these rules are broken the server will send back an error
      user.admin = false;
      await collections.users.doc(uid).set(user);
      commit('add', { uid, user });
    },

    login: async ({ dispatch }) => {

      // sign the user in with an auth pop-up
      const { user } = await auth.signInWithPopup(authProvider);

      // fetch the user, recording whether or not they were found
      const userExists = await dispatch('fetchByUid', user.uid);

      // if the user is not found, create them a profile in the
      // 'users' collection. 
      if (!userExists) {
        const { photoURL, displayName, email, uid } = user;
        dispatch('create', { uid, user: {
          photoURL,
          displayName,
          email
        }});
      }
    }
  }
}
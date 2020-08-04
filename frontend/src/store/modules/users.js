import { collections, auth, authProvider } from '../../firebase'

import Vue from 'vue'

export const users = {
  namespaced: true,
  state: () => ({
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
      if (auth.currentUser) {
        return state.items.find(user => user.uid === auth.currentUser.uid);
      }
    },
    isCurrentAdmin: (state, getters) => {
      const current = getters.current;
      if (current) {
        return current.admin;
      }
      return false;
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
    }
  },
  actions: {
    fetchByUid: async ({ commit }, uid) => {
      const snapshot = await collections.users.doc(uid).get();
      if (snapshot.exists) {
        const user = snapshot.data();
        commit('add', { user, uid });
        return true;
      }
      return false;
    },

    fetchByEmail: async ({ commit }, email) => {
      const snapshot = await collections.users
        .where('email', '==', email)
        .get();

      if (!snapshot.empty) {
        snapshot.forEach(user => {
          commit('add', { user: user.data(), uid: user.id });
        });
        return true;
      }
      return false;
    },

    fetchAllAdmins: async ({ commit, getters }) => {
      const snapshot = await collections.users.where('admin', '==', true).get();
      snapshot.forEach(admin => {
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
      const { user } = await auth.signInWithPopup(authProvider);

      const userExists = await dispatch('fetchByUid', user.uid);

      if (!userExists) {
        const newUser = {
          photoURL: user.photoURL,
          email: user.email,
          displayName: user.displayName
        }
        dispatch('create', { uid: user.uid, user: newUser });
      }
    }
  }
}
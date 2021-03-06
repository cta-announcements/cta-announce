import { timestamp, serverTimestamp, collections } from '../../firebase'
import { firestoreAction } from 'vuexfire'

import toDateFromISO from '../../util/toDateFromISO'

export const announcements = {
  namespaced: true,
  state: () => ({
    items: [
      // populated by firestore
    ]
  }),
  getters: {
    ordered: (state) => {
      // we have to copy the array in order to avoid mutating it 
      // which causes issues with Vuex Fire
      const items = [...state.items];
      items.sort((a, b) => b.created - a.created);
      return items;
    },
    displayedAndOrdered: (state, getters) => {
      return getters.ordered
        .filter(announcement => announcement.display);
    },
    displayed(state) {
      return state.items
        .filter(announcement => announcement.display);
    },
    ownedByCurrentUser(state, getters, rootState, rootGetters) {
      const currentUser = rootGetters['users/current'];

      // we can't use optional chaining here because we don't want to run
      // filter at all if the currentUser is undefined
      if (currentUser) {
        return getters.ordered
          .filter(announcement => announcement.authorUid === currentUser.uid);
      }
    }
  },
  actions: {

    bindRef: firestoreAction(({ bindFirestoreRef, dispatch }) => {

      // we hook into the serialization option for this, just to call fetchUser() for each
      // announcement.
      bindFirestoreRef('items', collections.announcements.where('expiry', '>=', timestamp.now()), {
        serialize: (snapshot) => {
          // call fetchUser. thanks to inflight there will not be duplicate items added
          // or calls made for announcements with the same author
          dispatch('users/fetchByUid', snapshot.data().authorUid, {root: true});

          // return the snapshot data with the id attached as a non
          // enumerable property (makes it easier to remove it when writing to the
          // database)
          return Object.defineProperty(snapshot.data(), 'id', {value: snapshot.id});
        }
      });
    }),

    unbindRef: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('items');
    }),

    create: firestoreAction(({ rootState, rootGetters }) => {

      // small utility function to covert from ISO String to Date
      const expiry = toDateFromISO(rootState.form.date);
      
      // announcements expire at 11:59 PM on their expiry date
      expiry.setHours(23);
      expiry.setMinutes(59);
      expiry.setSeconds(59);

      const announcement = {
        expiry: timestamp.fromDate(expiry),
        created: serverTimestamp,
        text: rootState.form.text,
        category: rootState.form.category,
        authorUid: rootGetters['users/current'].uid,
        display: rootGetters['users/current'].admin
      };
      collections.announcements.add(announcement);
    }),

    updateDisplay: firestoreAction((context, { id, display }) => {
      collections.announcements.doc(id).update({ display });
    }),

    delete: firestoreAction((context, id) => {
      collections.announcements.doc(id).delete();
    })
  }
}
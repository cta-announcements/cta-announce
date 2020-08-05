import { timestamp, serverTimestamp, collections } from '../../firebase'
import { firestoreAction } from 'vuexfire'

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
      if (currentUser) {
        return getters.ordered
          .filter(announcement => announcement.authorUid === currentUser.uid);
      }
    }
  },
  actions: {

    bindRef: firestoreAction(({ bindFirestoreRef, dispatch, rootGetters }) => {
      bindFirestoreRef('items', collections.announcements.where('expiry', '>=', timestamp.now()), {
        serialize: (snapshot) => {

          // call the fetch method for this announcements user id if they 
          // are not already in state
          const uid = snapshot.data().authorUid;
          if (rootGetters['users/getByUid'](uid)) {
            dispatch('users/fetch', uid, {root: true});
          }
          
          // snapshot.data() DOES NOT contain the `id` of the document. By
          // default, Vuefire adds it as a non enumerable property named id.
          // This allows to easily create copies when updating documents, as using
          // the spread operator won't copy it
          return Object.defineProperty(snapshot.data(), 'id', { value: snapshot.id })
        }
      });
    }),

    unbindRef: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('items');
    }),

    create: firestoreAction(({ rootState, rootGetters }) => {

      // announcements expire at 11:59 PM on their expiry date
      const expiry = new Date(rootState.form.date + 'T00:00:00');
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
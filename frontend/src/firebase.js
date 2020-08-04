import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

//firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCdq_ualhSCPbD9Hni6dN-YssNq6criYDg",
  authDomain: "cta-announcements-ce36d.firebaseapp.com",
  databaseURL: "https://cta-announcements-ce36d.firebaseio.com",
  projectId: "cta-announcements-ce36d",
  storageBucket: "cta-announcements-ce36d.appspot.com",
  messagingSenderId: "789298365520",
  appId: "1:789298365520:web:dffdf08356f4f73e5dbd55"
};

firebase.initializeApp(firebaseConfig);

// auth exports
const auth = firebase.auth();
const authProvider = new firebase.auth.GoogleAuthProvider();

// firestore exports
const firestore = firebase.firestore();

// if on localhost and in dev mode, use the emulator
if (location.hostname === 'localhost') {
  console.log('Connected to localhost');
  firestore.settings({
    host: 'localhost:8080',
    ssl: false
  });
}

const collections = {
  users: firestore.collection('users'),
  announcements: firestore.collection('announcements')
}

// export the time stamp class for expiry date, and the server field
// value for sending the current time.
const timestamp = firebase.firestore.Timestamp;
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

export {
  auth,
  authProvider,
  firestore,
  collections,
  timestamp,
  serverTimestamp
}

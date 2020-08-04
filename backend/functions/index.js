const admin = require('firebase-admin');
const functions = require('firebase-functions');

// setup the admin SDK with admin secret
admin.initializeApp();
const db = admin.firestore();

// every 24 hours all old announcements will be cleared. This helps save on database space and 
// network eggress.
exports.clearOldAnnouncements = functions.pubsub.schedule('every 24 hours').onRun( async (context) => {
   // query for all the announcements past their expiry date
   const snapshot = await db.collection('announcements')
   .where('expiry', '<', admin.firestore.Timestamp.now())
   .get();

   // loop through and delete all the expired announcements
   snapshot.forEach(async (doc) => {
      try {
         await db.collection('announcements').doc(doc.id).delete();
      } catch (e) {
         console.error(`There was an error clearing announcement ${doc.id}: ${e.message}`);
      }
      console.log(`successfully cleared announcement: ${doc.id}`)
   });

   return null;
});
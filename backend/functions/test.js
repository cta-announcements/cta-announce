const fs = require('fs');
const path = require('path');

const TEST_FIREBASE_PROJECT_ID = "test-firestore-rules-project";

const firebase = require("@firebase/testing");

// two authorized users
const aliceAuth = {
    uid: 'alice',
    email: 'alice@example.com'
};
const bobAuthAdmin = {
    uid: 'bob',
    email: 'bob@example.com'
}

before(async () => {
    // Load the content of the "firestore.rules" file into the emulator before running the
    // test suite. This is necessary because we are using a fake Project ID in the tests,
    // so the rules "hot reloading" behavior which works in the Web App does not apply here.
    const rulesContent = fs.readFileSync(path.resolve(__dirname, "../firestore.rules"), "utf8");
    await firebase.loadFirestoreRules({
        projectId: TEST_FIREBASE_PROJECT_ID,
        rules: rulesContent
    });
});

after(() => {
    firebase.apps().forEach(app => app.delete());
});

// helper function to return new firebase auth instance
const createDB = ({ withAuth = true, auth = aliceAuth }) => {

    if (withAuth) {
        return firebase.initializeTestApp({
            projectId: TEST_FIREBASE_PROJECT_ID,
            auth: auth
        }).firestore()
    }

    return firebase.initializeTestApp({ projectId: TEST_FIREBASE_PROJECT_ID }).firestore();
};

// helper function to seed announcement data. Returns a unique object
// each time its called. This avoids mutations breaking other tests.
const createAnnouncement = () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 5);
    const testAnnouncement = {
        authorUid: aliceAuth.uid,
        category: 'Sports',
        created: firebase.firestore.FieldValue.serverTimestamp(),
        expiry: firebase.firestore.Timestamp.fromDate(expiry),
        display: false,
        text: 'Hello'
    };
    return { ...testAnnouncement }
}

/* announcement unit tests */
describe('announcement validation', () => {

    it('can be created with correct required fields', async () => {
        const db = createDB({ withAuth: true });
        await firebase.assertSucceeds(db.collection('announcements').add(createAnnouncement()))
    })

    it('cannot have a message length over 500 characters', async () => {
        const db = createDB({ withAuth: true });
        const announcement = createAnnouncement();
        announcement.text = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
        Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, 
        nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. 
        Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. 
        In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. 
        Integer tincidunt. Cras dapibu + 2`;
        await firebase.assertFails(db.collection('announcements').add(announcement))
    })

    it('expiry date can be 10 days away', async () => {
        const db = createDB({ withAuth: true });
        const announcement = createAnnouncement();

        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 10);
        expiry.setHours(23);
        expiry.setMinutes(59);
        expiry.setSeconds(59);

        announcement.expiry = expiry;

        await firebase.assertSucceeds(db.collection('announcements').add(announcement));

    })

    // hooks
    after(async () => {
        await firebase.clearFirestoreData({ projectId: TEST_FIREBASE_PROJECT_ID })
    })
})

describe('announcement permissions', () => {

    // setup two users, alice and bob, where one is admin 
    // to test for permissions
    before(async () => {
        const db = firebase.initializeAdminApp({ projectId: TEST_FIREBASE_PROJECT_ID }).firestore();

        // alice
        db.collection('users').doc(aliceAuth.uid).set({
            admin: false
        });

        // bob (admin)
        db.collection('users').doc(bobAuthAdmin.uid).set({
            admin: true
        });
    })

    it('cannot be created without auth', async () => {
        const db = createDB({ withAuth: false });
        const announcement = createAnnouncement();
        announcement.authorUid = '';
        await firebase.assertFails(db.collection('announcements').add(announcement))
    })

    it('can have display set to true by admin', async () => {
        const db = createDB({ withAuth: true, auth: bobAuthAdmin });
        const announcement = createAnnouncement();
        announcement.display = true;
        await firebase.assertFails(db.collection('announcements').add(announcement))
    })

    it('cannot have display set to true by non admin', async () => {
        const db = createDB({ withAuth: true });
        const announcement = createAnnouncement();
        announcement.display = true;
        await firebase.assertFails(db.collection('announcements').add(announcement))
    })

    it('non admins can only delete their own announcements', async () => {

        const dbBobAdmin = createDB({ withAuth: true, auth: bobAuthAdmin });
        const dbAlice = createDB({ withAuth: true });

        // create an announcement as bob (does not matter that he is an admin)
        const announcement = createAnnouncement();
        announcement.authorUid = bobAuthAdmin.uid;
        const doc = await dbBobAdmin.collection('announcements').add(announcement);

        // try to delete this announcement as alice
        await firebase.assertFails(dbAlice.collection('announcements').doc(doc.id).delete());
    })

    // hooks
    after(async () => {
        await firebase.clearFirestoreData({ projectId: TEST_FIREBASE_PROJECT_ID })
    })

});




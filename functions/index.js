const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp()

// called when user is created
exports.createUserInFirestore = functions.auth.user().onCreate((user) => {
  admin.firestore().collection('users').doc(user.uid).set({
    name: '名無しさん',
    profileImage: ''
  }).then(0)
    .catch(-1)
})
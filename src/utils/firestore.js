const admin = require('firebase-admin');
require('dotenv').config();

const { FIREBASE_CREDENTIALS_PATH } = process.env;

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CREDENTIALS_PATH),
});

const db = admin.firestore();

module.exports = db;
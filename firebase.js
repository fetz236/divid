import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7IpxBOGcG2ZrJlFP41FNJWyrqf7GbCqo",
  authDomain: "divid-edf5d.firebaseapp.com",
  projectId: "divid-edf5d",
  storageBucket: "divid-edf5d.appspot.com",
  messagingSenderId: "1058141177555",
  appId: "1:1058141177555:web:cdae63d7968b862966b626",
  measurementId: "G-KPRHSEQL06"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = getStorage(app);

export { db, auth, storage };
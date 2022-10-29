import { getAnalytics } from 'firebase/analytics';
// Modular Firebase v.9 Initialization.
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getStorage,
} from 'firebase/firestore';

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7OmWf-eTH9JlKzQUEDwhz71b4OSCvW4g",
  authDomain: "nolan-corcoran.firebaseapp.com",
  projectId: "nolan-corcoran",
  storageBucket: "nolan-corcoran.appspot.com",
  messagingSenderId: "653201054530",
  appId: "1:653201054530:web:8557d0e69ab2adeeb146db",
  measurementId: "G-T6C8JKF4RM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage();

function initFirebase() {
  if (typeof window !== undefined) {
    initializeApp(firebaseConfig);
    //console.log("Firebase has been init successfully");
  }
}

//const app = initializeApp(clientCredentials);

export { firestore, initFirebase, storage };

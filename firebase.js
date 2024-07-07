// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfYOVDaKgrOoDqztveqOIzw-LVIkmHL5k",
  authDomain: "p2ploanapp-fd55d.firebaseapp.com",
  projectId: "p2ploanapp-fd55d",
  storageBucket: "p2ploanapp-fd55d.appspot.com",
  messagingSenderId: "608778951186",
  appId: "1:608778951186:web:973dcf980819f37e0c56cb",
  measurementId: "G-6YEQYQR7FB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

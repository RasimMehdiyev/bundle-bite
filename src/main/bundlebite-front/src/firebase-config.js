// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8OOYJv4tzQsYBhgWaMM1afkypRt19TfQ",
  authDomain: "bundle-bite.firebaseapp.com",
  projectId: "bundle-bite",
  storageBucket: "bundle-bite.appspot.com",
  messagingSenderId: "984268330729",
  appId: "1:984268330729:web:23a0ba1f68fb26651a0278",
  measurementId: "G-ZYTFEJ3WLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export {auth};
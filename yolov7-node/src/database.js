// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7eJA-Gl-Yi86KDX8nxf_67yTm3Ovd-M8",
  authDomain: "peoplecounting-4f4a4.firebaseapp.com",
  projectId: "peoplecounting-4f4a4",
  storageBucket: "peoplecounting-4f4a4.appspot.com",
  messagingSenderId: "414950789625",
  appId: "1:414950789625:web:e9156a2f60b54fc6b22d28",
  measurementId: "G-VHEH6XGP0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
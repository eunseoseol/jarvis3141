// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqUKdZ-26nb5iEn3MI91RBSVJ6I7Bf84I",
  authDomain: "eunseo--seol.firebaseapp.com",
  projectId: "eunseo--seol",
  storageBucket: "eunseo--seol.appspot.com",
  messagingSenderId: "234269355000",
  appId: "1:234269355000:web:418b191d3984705112440d",
  measurementId: "G-PKWT5L1ZEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

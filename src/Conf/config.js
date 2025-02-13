// src/config/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaifJG7L0p_4dcw-uAS5353F3HNpmpdb8",
  authDomain: "raw-red.firebaseapp.com",
  projectId: "raw-red",
  storageBucket: "raw-red.appspot.com",
  messagingSenderId: "269090975011",
  appId: "1:269090975011:web:25cda78c9e79a2a05ab096",
  measurementId: "G-31BG71C3DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app,auth,db };

// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqMIorrlT9M0h-DVdjx3iFgk-wU9j4gWI",
  authDomain: "initiationofbook.firebaseapp.com",
  projectId: "initiationofbook",
  storageBucket: "initiationofbook.firebasestorage.app",
  messagingSenderId: "94623293581",
  appId: "1:94623293581:web:511db4c2c898b5dbf702c4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


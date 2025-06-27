// src/firebase/auth.js
import { getAuth } from 'firebase/auth';
import { app } from './firebaseconfig'; // Your initialized Firebase app

const auth = getAuth(app);
export default auth;

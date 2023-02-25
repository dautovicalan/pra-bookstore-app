import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAsMaJgPv0TBO-7yXRI7f3_wKm8bijdyds",
  authDomain: "pra-project-d34fc.firebaseapp.com",
  projectId: "pra-project-d34fc",
  storageBucket: "pra-project-d34fc.appspot.com",
  messagingSenderId: "77794431518",
  appId: "1:77794431518:web:b8c77736bf215a5e8b140f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
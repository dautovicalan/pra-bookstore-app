// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnydg7PTp54lNPyVMgVgOYtyQ6t3Th-Mk",
  authDomain: "pra-project-admin.firebaseapp.com",
  projectId: "pra-project-admin",
  storageBucket: "pra-project-admin.appspot.com",
  messagingSenderId: "733781091075",
  appId: "1:733781091075:web:d11e852185c0f60fdc3f36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
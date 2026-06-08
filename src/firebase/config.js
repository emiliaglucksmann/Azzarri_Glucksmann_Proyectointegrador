import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDqILMOsRCdMtxVnxV6-lheYkNZ80nPtqA",
  authDomain: "proyecto-integrador-53fa0.firebaseapp.com",
  projectId: "proyecto-integrador-53fa0",
  storageBucket: "proyecto-integrador-53fa0.firebasestorage.app",
  messagingSenderId: "780569866943",
  appId: "1:780569866943:web:d8287136772cff9c0d8c0a"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
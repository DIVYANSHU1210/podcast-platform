// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0Nfy8ZRJlIWJByZKGzT29XBSiXNEz1o4",
  authDomain: "podcast-platform-c5ace.firebaseapp.com",
  projectId: "podcast-platform-c5ace",
  storageBucket: "podcast-platform-c5ace.appspot.com",
  messagingSenderId: "767947139233",
  appId: "1:767947139233:web:ea789ab5247f46759868e0",
  measurementId: "G-DETE3KJDLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const storage = getStorage(app); 
const auth =  getAuth(app);

export {db, storage, auth};
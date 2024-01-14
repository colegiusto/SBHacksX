// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkNbN2s5qspjIvh0etnpOwFxGleJv3xLw",
    authDomain: "hacks24.firebaseapp.com",
    databaseURL: "https://hacks24-default-rtdb.firebaseio.com",
    projectId: "hacks24",
    storageBucket: "hacks24.appspot.com",
    messagingSenderId: "283468249994",
    appId: "1:283468249994:web:fcef1194a4ee237abaa673",
    measurementId: "G-8Z0EM2XGR9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = firebase.auth();

export default { auth, db };
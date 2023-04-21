// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDa_ldf3lqgMPFHritHEP_uhixPjeSeEec",
    authDomain: "chatroom-a2973.firebaseapp.com",
    projectId: "chatroom-a2973",
    storageBucket: "chatroom-a2973.appspot.com",
    messagingSenderId: "347169453450",
    appId: "1:347169453450:web:25881b947b06fc5407c473",
    measurementId: "G-LDVBWGVE0T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6uUTFAiu6xmpL3CMC_qGF60gVHTUiaPg",
  authDomain: "travel-planner-821c3.firebaseapp.com",
  projectId: "travel-planner-821c3",
  storageBucket: "travel-planner-821c3.firebasestorage.app",
  messagingSenderId: "595939075333",
  appId: "1:595939075333:web:0595ca44c1d094d67b036c",
  measurementId: "G-6Z51GWX75L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLQU8o7Mahp4L7mL2-_TnfBH6hKn9Pi0E",
  authDomain: "sevimli-supermarket.firebaseapp.com",
  projectId: "sevimli-supermarket",
  storageBucket: "sevimli-supermarket.appspot.com",
  messagingSenderId: "71094727676",
  appId: "1:71094727676:web:51250fadec616116e9f879"
};
// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
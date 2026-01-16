// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbKU7uWnXa2jtQUOdxq_lfmlOsYkGnok8",
  authDomain: "secuvision-8b0d0.firebaseapp.com",
  databaseURL: "https://secuvision-8b0d0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "secuvision-8b0d0",
  storageBucket: "secuvision-8b0d0.firebasestorage.app",
  messagingSenderId: "841968829963",
  appId: "1:841968829963:web:9a8595c398927aff9d690e",
  measurementId: "G-X7F3E3XFB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth};
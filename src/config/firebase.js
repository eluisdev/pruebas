import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL8tkKNSTrP_Y_5FcibWJS-HAJribtXME",
  authDomain: "fir-crud-2b27c.firebaseapp.com",
  projectId: "fir-crud-2b27c",
  storageBucket: "fir-crud-2b27c.firebasestorage.app",
  messagingSenderId: "138343262551",
  appId: "1:138343262551:web:25bbcc75d39c5b9232f612",
  measurementId: "G-0TMZ5F04M5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {
  app,
  analytics
}
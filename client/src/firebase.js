import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDe4CxZ22i4-C_kNdmX0OVfcKu3dyvYDIw",
    authDomain: "ps-pg12.firebaseapp.com",
    projectId: "ps-pg12",
    storageBucket: "ps-pg12.appspot.com",
    messagingSenderId: "87626998092",
    appId: "1:87626998092:web:4b6b99139acad0f5c6afe9",
    measurementId: "G-T210VZ76YH"
  };
  
  
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  const analytics = getAnalytics(app);
  
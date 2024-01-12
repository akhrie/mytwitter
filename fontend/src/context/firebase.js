import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAl5-l6Rqc84nDSS_wYep6Do4YDBpzIE_4",
  authDomain: "fir-app-bbfbd.firebaseapp.com",
  projectId: "fir-app-bbfbd",
  storageBucket: "fir-app-bbfbd.appspot.com",
  messagingSenderId: "1027510644715",
  appId: "1:1027510644715:web:905907681bfaecc756b3ae",
  measurementId: "G-G2L4MVHWM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

export default auth; 

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu1WTN45ltUck7jv3nJeLAMKrk4Vp1iBs",
  authDomain: "react-course-7cd07.firebaseapp.com",
  projectId: "react-course-7cd07",
  storageBucket: "react-course-7cd07.appspot.com",
  messagingSenderId: "42013097573",
  appId: "1:42013097573:web:a63b06ed6c57248aa2108c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
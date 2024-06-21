import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD8-bqU-jpsGhtFK1prgDfO0ZNb6brKr-I",
  authDomain: "resultchecker-b5c68.firebaseapp.com",
  projectId: "resultchecker-b5c68",
  storageBucket: "resultchecker-b5c68.appspot.com",
  messagingSenderId: "819415106792",
  appId: "1:819415106792:web:1de6318cac7e888703f55d",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

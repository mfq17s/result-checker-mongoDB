import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZJbvFRnep1EG8gQmi-fzwwNplLUFhuXU",
  authDomain: "resultchecker-590ae.firebaseapp.com",
  projectId: "resultchecker-590ae",
  storageBucket: "resultchecker-590ae.appspot.com",
  messagingSenderId: "1005245606030",
  appId: "1:1005245606030:web:0390d5599d9631f1ebc1df",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

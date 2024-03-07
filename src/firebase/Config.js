import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCKXcrjAvPTCv_l3RQ3bspA4pcY9l33Xfo",
  authDomain: "olx-clone-27a8a.firebaseapp.com",
  projectId: "olx-clone-27a8a",
  storageBucket: "olx-clone-27a8a.appspot.com",
  messagingSenderId: "441803967123",
  appId: "1:441803967123:web:d6c369080057d86bb6db66",
  measurementId: "G-9R7CEXDLRQ"
};

export const firebase = initializeApp(firebaseConfig);


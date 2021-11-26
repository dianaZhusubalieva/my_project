import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCtXpkfpWUZhHAKi-u2ELBxi0QtVhAj1V8",
  authDomain: "netflix-trial-c30af.firebaseapp.com",
  projectId: "netflix-trial-c30af",
  storageBucket: "netflix-trial-c30af.appspot.com",
  messagingSenderId: "120146569367",
  appId: "1:120146569367:web:81eb818385b2b6014f21d2",
};

const app = initializeApp(firebaseConfig);

export const authh = getAuth(app);

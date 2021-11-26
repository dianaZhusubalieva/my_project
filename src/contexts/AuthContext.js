import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { authh } from "../utils/initFirebase";

const AuthContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  logout: () => Promise,
  signInWithGoogle: () => Promise,
  forgotPassword: () => Promise,
});

//CREDIT cARD

//! NAVBAR чтобы показать вошел или нет пользователь(если да  то отобр имейла)

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  let adminEmail = "dinazhusubalieva@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authh, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // add in navbar
  // const {currentUser} = useAuth()
  // <h5>{JSON.stringify(currentUser.email)</h5>

  function register(email, password) {
    return createUserWithEmailAndPassword(authh, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(authh, email, password);
  }
  function logout() {
    return signOut(authh);
  }

  function signInWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(authh, googleProvider);
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(authh, email, {
      url: "http://localhost:3002/login",
    });
  }

  const value = {
    currentUser,
    adminEmail,
    register,
    login,
    logout,
    signInWithGoogle,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

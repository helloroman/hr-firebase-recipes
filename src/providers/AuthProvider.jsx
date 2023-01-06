import React, {useContext, useState} from 'react';
import {onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {auth, provider} from "../main.jsx";

const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUserData] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserData(user);
    } else {
      setUserData(null);
    }
  });

  const handleSignIn = async () => {
    try {
      const authResult = await signInWithPopup(auth, provider);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  }

  return <AuthContext.Provider value={{user, handleSignIn, handleSignOut}}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw Error('useAuth needs to be used inside AuthContext Provider');
  }

  return auth;
}
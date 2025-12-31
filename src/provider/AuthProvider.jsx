import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/Firebase.config";
import { AuthContext } from '../context/AuthContext';



const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

     const googleProvider = new GoogleAuthProvider();

      const signInWithGoogle = () => {
      return signInWithPopup(auth, googleProvider)
   }

   const updateUserProflie = (displayName, photoURL) => {
       updateProfile(auth.currentUser, { displayName, photoURL})
       .then(() => {
         setUser({...user, displayName, photoURL})
       })
       .catch(err=> {
        console.log(err)
       })
   }

    const createUser =(email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

   const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

    const logOut = () => {
    return signOut(auth);
    };

    useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>{
            unsubscribe();
        }

    },[])

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        setLoading,
        updateUser,
        signInWithGoogle,
        updateUserProflie,
    };

    return <AuthContext value={authData}>{children}</AuthContext>
};

export default AuthProvider;
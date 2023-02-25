import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";


const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function register(email, password, firstName, lastName) {        
        return createUserWithEmailAndPassword(auth, email, password);         
    }

    //updateProfile(auth.currentUser, {displayName: `${firstName} ${lastName}`});
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        return signOut(auth);
    }

    function setupProfile(name, surname){
        return updateProfile(auth.currentUser, {
            displayName: `${name} ${surname}` 
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        register,
        login,
        logout,
        setupProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}
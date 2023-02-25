import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword, updateProfile, } from "firebase/auth";

const AuthContextCustomer = React.createContext();

export function useAuth() {
  return useContext(AuthContextCustomer);
}

export const AuthContextCustomerProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);


  function register(email, password, firstName, lastName) {
    return fetch("/api/customer/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
  }

  function login(email, password){
      return signInWithEmailAndPassword(auth, email, password);
  }

  function logout(){
      return signOut(auth);
  }

  function resetPassword(email){
    return sendPasswordResetEmail(auth, email);
  }

  function updateCustomerPassword(password){    
      return updatePassword(auth.currentUser, password);
  }

  function updateCustomerProfile(name, surname){
    return updateProfile(auth.currentUser, {
      displayName: `${name} ${surname}`
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return setCurrentUser(user);
      }
      const result = await fetch("/api/customer/getCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ userUid: user.uid }),
      });
      const data = await result.json();
      console.log(data);
      setCurrentUser({...user, cityName: data.cityName, postNumber: data.postNumber, streetAddress: data.streetAddress});
      setLoading(false);
    });

    return unsubscribe;
  }, []);


  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
    updateCustomerPassword,
    updateCustomerProfile
  };

  return (
    <AuthContextCustomer.Provider value={value}>
      {!loading && props.children}
    </AuthContextCustomer.Provider>
  );
};

// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { addUser, getUser } from "../services/userService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser(user.uid);
        if (userData) {
          setUser(userData);
        } else {
          // Handle case where user doc doesn't exist if necessary
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const signup = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });

      const userData = {
        userId: userCredential.user.uid,
        displayName: username,
        email: email,
        tier: 3,
        creditScore: 20,
        availableAmount: 1000,
        transactionRecord: [],
        loanedTo: [],
        loanedFrom: [],
        loanedAmount: 0,
        lendedAmount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("userData:", userData);

      await addUser(userCredential.user.uid, userData);

      setUser(userData);
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state on logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

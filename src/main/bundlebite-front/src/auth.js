import { auth , db, collection, setDoc, addDoc, doc, getDoc} from './firebase-config';
import {createUserWithEmailAndPassword, onAuthStateChanged ,signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import { useState, useEffect } from 'react';

// Sign up function

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const usersRef = doc(db, "users", user.uid);

      setDoc(usersRef, {
        email: email,
        uid: user.uid,
        name: user.displayName,
        role: "customer"
      });
    })
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

// Sign in function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    console.log("Signed in:", userCredential.user);
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("Signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};

// Get the current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

export const useAuth = () =>{
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setRole(user.getIdTokenResult().then((idTokenResult) => {
        console.log("User role:", idTokenResult.claims.role);
        return idTokenResult.claims.role;
      }));
    });
    return unsubscribe;
  }, []);

  return { user, loading, role};
}

export const getUserRole = async () => {
  const user = getCurrentUser();
  if (user){
    const idTokenResult = await user.getIdTokenResult();
    return idTokenResult.claims.role;
  }
}

onAuthStateChanged(auth, (user) => {
  if (user){
    user.getIdToken(true)
    user.getIdTokenResult()
    .then((idTokenResult) => {
      console.log("User role:", idTokenResult.claims.role);
      return idTokenResult.claims.role;
    })
  }
});


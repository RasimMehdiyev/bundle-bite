import { auth , db, collection, setDoc, addDoc, doc, getDoc} from './firebase-config';
import {createUserWithEmailAndPassword, onAuthStateChanged ,signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useState, useEffect } from 'react';

// Sign up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const usersRef = doc(db, "users", user.uid);
      console.log("Signed up:", user);
      // Add user to the database
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
}

export const getUserRole = async () => {
  const user = getCurrentUser();
  if (user) {
    const userRef = await doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().role;
     }
  }
  return null;
}

// export const addOrder = async (order) => {

//   try {
//     const user = getCurrentUser();
//     if (user) {
//       const ordersRef = collection(db, "orders");
//       const orderRef = await addDoc(ordersRef, {
//         ...order,
//         uid: user.uid,
//         status: "pending"
//       });
//       console.log("Order added with ID: ", orderRef.id);
//     }
//   } catch (error) {
//     console.error("Error adding order:", error.message);
//   }
// }

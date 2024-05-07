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
      console.log("Signed up:", user);
      // set custom claims
      // admin.auth().setCustomUserClaims(uid, {manager: true});
      // Add user to the database
      setDoc(usersRef, {
        email: email,
        uid: user.uid,
        name: user.displayName,
        role: "manager"
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
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("User data:", userData); // See all data for the user

        if (userData.role && userData.role.value) {
          console.log("Role data:", userData.role.value); // Specifically log the role value
          return userData.role.value; // Ensure you are returning the value field
        } else {
          console.log("Role data is not structured as expected:", userData.role);
          return userData.role; // Fallback to returning the whole role object or whatever is present
        }
      } else {
        console.log("No document exists for the user with ID:", user.uid);
      }
    } catch (error) {
      console.error("Failed to fetch user role:", error);
    }
  } else {
    console.log("No user is currently logged in.");
  }
  return null;
};

onAuthStateChanged(auth, (user) => {
  if (user){
    user.getIdTokenResult()
    .then((idTokenResult) => {
      console.log("User role:", idTokenResult.claims.role);
      return idTokenResult.claims.role;
    })
  }
});



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

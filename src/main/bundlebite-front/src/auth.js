import { auth, db, setDoc, doc, collection, getDocs, where, query } from './firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useState, useEffect } from 'react';

// Sign up function

export const signUp = async(email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const usersRef = doc(db, "users", user.uid);
                // set displayName
                updateProfile(user, {
                    displayName: name,
                }).then(() => {
                    console.log("Display name set");
                }).catch((error) => {
                    console.error("Error setting display name:", error);
                });

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
export const signIn = async(email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        console.log("Signed in:", userCredential.user);
    } catch (error) {
        console.error("Error signing in:", error.message);
        throw error;
    }
};

// Sign out function
export const signOutUser = async() => {
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

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");


    useEffect(() => {
        // This function sets up the listener and returns the unsubscribe function directly
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                try {
                    const idTokenResult = await currentUser.getIdTokenResult();
                    // print everything in the token
                    // console.log("Token:", idTokenResult.claims);
                    // print ev
                    setName(idTokenResult.claims.name || currentUser.displayName);
                    setRole(idTokenResult.claims.role || 'customer'); // Default to 'customer' if no role is set
                    // console.log("User role:", idTokenResult.claims.role);
                    // console.log("User:", user);
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setRole(''); // Set role to empty if there's an error
                }
            } else {
                setRole(""); // Clear role if no user is signed in
            }
        });

        // Return the unsubscribe function to be called on component unmount
        return unsubscribe;
    }, [user]);
    // console.log("User:", user);
    return { user, loading, role, name };
}

export const getUserRole = async() => {
    const user = getCurrentUser();
    if (user) {
        const idTokenResult = await user.getIdTokenResult();
        return idTokenResult.claims.role;
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        user.getIdToken(true)
        user.getIdTokenResult()
            .then((idTokenResult) => {
                console.log("User role:", idTokenResult.claims.role);
                return idTokenResult.claims.role;
            })
    }
});


export const submitCart = (order) => {
    const user = getCurrentUser();
    if (user) {
        const ordersRef = doc(db, "orders", order.uid);
        setDoc(ordersRef, order);
    }
}
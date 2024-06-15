import React, { useEffect } from "react";
import {useAuth} from "../auth.js";
import { useNavigate } from "react-router-dom";
import { doc, db, getDocs,setDoc, updateDoc,where,query,collection } from "../firebase-config.js";
import { getCurrentUser } from "../auth.js";

const ProductCard = (props) => {
    const {user,loading,role} = useAuth();
    const navigate = useNavigate();

    const addToCart = async () => {
        const user = getCurrentUser();
        if (!user) {
            console.error("User is not logged in.");
            return;
        }
    
        // Check if product ID is available
        if (!props.id) {
            console.error("Product ID is undefined!");
            return;
        }
    
        const cartsRef = collection(db, "carts");
        // Reference to the user's cart based on their UID
        const q = query(cartsRef, where("user", "==", doc(db, "users", user.uid)));
        const querySnapshot = await getDocs(q);
    
        // Prepare the item to add
        const newItem = doc(db, "BundleBite", props.id);
    
        if (!querySnapshot.empty) {
            // Cart exists
            const cartDoc = querySnapshot.docs[0];
            const currentItems = cartDoc.data().items || [];
            // Add the new item to the array
            const updatedItems = [...currentItems, newItem];
            console.log("Updated items: ", updatedItems);
            await updateDoc(cartDoc.ref, {
                items: updatedItems, // Update the items array directly with the new list
                lastUpdated: new Date() // Update the last updated time
            });
            console.log("Item added to existing cart.");
        } else {
            // No cart exists, create one
            let uid = "C" + Math.random().toString(36).substr(2, 9).toUpperCase();
            await setDoc(doc(cartsRef, uid), {
                user: doc(db, "users", user.uid),
                lastUpdated: new Date(),
                status: true,
                totalPrice: 0,
                uid: uid,
                items: [newItem] // Create an array with the new item as the only element
            });
            console.log("New cart created and item added.");
        }
    };

    useEffect   (() => {
        console.log("User: ", user);
        console.log(props)
    }, []);


    const redirectToLogin = () => {
        navigate("/login");
    }

    return (
        <div className={props.availability ? "product" : "product-not-available"}>
            <img className="product-img" src={process.env.PUBLIC_URL + props.img} alt={props.name} />
            <span className="product-name">{props.name}</span>
            <span className="product-price">€{props.price}</span>
            <span className="product-buttons">
            {
                user ? (
                    role !== 'manager' ? (
                        props.availability ? 
                    (
                        <button className="button-text" onClick={addToCart}>ADD TO CART</button>
                    ) :
                    <button className="button-text-disabled">ADD TO CART</button>

                    ) : 
                    null 
                    
                ) :                     
                <button className="button-text" onClick={redirectToLogin}>ADD TO CART</button>
                // This ensures nothing is rendered if there is no user
            }

            </span>
        </div>
    );
}

export default ProductCard;
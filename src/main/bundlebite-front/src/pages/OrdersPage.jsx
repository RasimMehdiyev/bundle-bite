import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import SidebarComponent from "../components/SidebarComponent.jsx";
import OrderCardComponent from "../components/OrderCardComponent.jsx";
import OrderModalComponent from "../components/OrderModalComponent.jsx";
import { useState } from "react";
import {getCurrentUser, submitCart, getCart} from "../auth.js"
import { doc,db,getDoc, query,where,collection,getDocs, updateDoc } from "../firebase-config.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const OrdersPage = () => {
    const [showModal, setShowModal] = useState("none");
    const navigate = useNavigate('');
    const [loading, setLoading] = useState(true);

    // Define state for cards array
    const [cards, setCards] = useState([]);

    const submitCartLocal = async () => {
        const user = getCurrentUser();
        
        console.log("Cart submitted");
        let items = [];
        // Convert each item to a Firestore DocumentReference
        cards.forEach(card => {
            for (let i = 0; i < card.quantity; i++) {
                items.push(doc(db, "BundleBite", card.ref)); // Create a document reference
            }
        });
        
        let orderDate = new Date();
        let uid = "O" + Math.random().toString(36).substr(2, 9).toUpperCase();
        let order_local = {
            items: items, // These are now Firestore DocumentReferences
            orderDate: orderDate,
            status: "pending",
            totalPrice: cards.reduce((acc, card) => acc + card.price * card.quantity, 0),
            uid: uid,
            user: doc(db, "users", getCurrentUser().uid) // Convert user reference as well
        }
        console.log(order_local);

        let itemsToSubmit = [];
        for (const itemRef of order_local.items) {
            const itemSnap = await getDoc(itemRef);
            if (itemSnap.exists()) {
                const itemData = itemSnap.data();
                itemsToSubmit.push({
                    "id": itemRef.id,
                    "name": itemData.name,
                    "price": itemData.price,
                    "quantity": cards.find(card => card.ref === itemRef.id).quantity
                });
            }
        }
        
        const itemsMap = new Map();
        for (const item of itemsToSubmit) {
            if (itemsMap.has(item.id)) {
                const existingItem = itemsMap.get(item.id);
                existingItem.quantity += item.quantity;
            } else {
                itemsMap.set(item.id, { ...item });
            }
        }

        // Convert the Map back to an array
        const uniqueItems = Array.from(itemsMap.values());
        let order = {
            "orderDate": order_local.orderDate,
            "status": order_local.status,
            "totalPrice": order_local.totalPrice,
            "uid": order_local.uid,
            "user": "/" + order_local.user.path,
            "items": uniqueItems
        }
        console.log(order);
        let token = await user.getIdToken();
        let axios_response;
        try {
            axios.post('/users/order/checkout', order,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    }
                }

            )
                .then(response => {
                    axios_response = response.data;
                    console.log(response.data);
                    if (axios_response === true) {
                        submitCart(order_local);
                        setCards([]);
                        console.log("Order submitted successfully!");
                    }
                    else {
                        console.error("There was an error submitting the order!");
                    }
                })
                .catch(error => {
                    console.error("There was an error submitting the order!", error);
                });
        }
        catch (error) {
            console.error("There was an error submitting the order!", error);
        }

        
        
    }
    useEffect(() => {
            const fetchCartItems = async () => {
                const user = getCurrentUser();
                setLoading(true); // Start loading
                if (user) {
                    const cartsRef = collection(db, "carts");
                    const q = query(cartsRef, where("user", "==", doc(db, "users", user.uid))); // Assuming there's a user field that stores references
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        let fetchedCards = [];
                        for (let doc of querySnapshot.docs) {
                            const data = doc.data();
                            for (let itemRef of data.items) {
                                const mealSnap = await getDoc(itemRef);
                                if (mealSnap.exists()) {
                                    const mealData = mealSnap.data();
                                    let found = false; // Flag to track if the item is found in the existing list
                            
                                    // Loop through fetchedCards to see if the item already exists
                                    for (let fetchedCard of fetchedCards) {
                                        if (fetchedCard.ref === itemRef.id) {
                                            fetchedCard.quantity++; // Increment quantity if found
                                            found = true;
                                            break; // Stop checking further as we found the item
                                        }
                                    }
                            
                                    // If the item was not found in the list, add it as a new entry
                                    if (!found) {
                                        fetchedCards.push({
                                            ref: itemRef.id, // Firestore document ID
                                            name: mealData.name,
                                            img: mealData.imagePath, // Ensure imagePath exists in the document
                                            price: mealData.price,
                                            quantity: 1 // Initialize with a quantity of 1
                                        });
                                    }
                                } else {
                                    console.log("No meal data found for ref:", itemRef.id);
                                }
                            }
                        console.log("Fetched cards:", fetchedCards);
                        setCards(fetchedCards);
                    }
                    setLoading(false); // Stop loading
                }
                else{
                    setLoading(false); // Stop loading
                }
            };
        }
            fetchCartItems();
    }, []);

    const openModal = () => {
        setShowModal("block"); // Show the modal
    }

    const handleCancel = () => {
        console.log("Canceled");
        setShowModal("none"); // Hide the modal
      };
    
      const handleConfirm = () => {
        console.log("Order Confirmed");
        setShowModal("none"); // Hide the modal
        submitCartLocal();
      };

    // Function to update quantity for a card by ID
    const updateQuantity = (ref, newQuantity) => {
            setCards(
                cards.map(card => {
                    if (card.ref === ref) {
                        console.log("card id: " + card.ref + " new quantity: " + newQuantity)
                        // add the the card to the cart with the new quantity
                        console.log(cards);
                        return {
                            ...card,
                            quantity: newQuantity
                        };
                    }
                    return card;
                })
            );

        };

        const navigateHome = () => {
            navigate("/");
        }
    
        const removeItemByRefLocal = async (ref) => {
            const user = getCurrentUser();
            if (!user) {
                console.log("User not found");
                return;
            }
        
            // Fetch the cart from Firestore
            const cartsRef = collection(db, "carts");
            const q = query(cartsRef, where("user", "==", doc(db, "users", user.uid)));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                // Assume there is only one cart per user
                const cartDoc = querySnapshot.docs[0];
                const cartData = cartDoc.data();
                let updatedItems = [];
                for (let card of cards) {
                    if (card.ref !== ref) {
                        updatedItems.push(doc(db, "BundleBite", card.ref));
                    }
                }
                console.log(updatedItems)
                // Update Firestore
                await updateDoc(cartDoc.ref, {
                    items: updatedItems
                });
        
                // Update local state
                setCards(cards.filter(card => card.ref !== ref));
                console.log("Removed item with ref: " + ref);
            } else {
                console.log("No cart found for the user");
            }
        }
        
        
        

    return(
        <div>
            <div className="page" id="content-div">
            <SidebarComponent username="John Doe"/>
                <div className="orders">
                <p className="cart-title">YOUR CART</p>
                {loading ? (
                    <div className="spinner"></div> // Loading indicator
                ) : cards.length > 0 ? (
                    cards.map(card => (
                        <OrderCardComponent key={card.ref} card={card} updateQuantity={updateQuantity} remove={removeItemByRefLocal} />
                    ))
                ) : (
                    <div className="empty-cart">
                        <p >Your cart is empty :(</p>
                        <button class="empty-cart-shop-button" onClick={navigateHome}>SHOP</button>
                    </div>
                )}


                {/* {cards.length === 0 && 

                }
                {
                    cards.length > 0 && cards.map(card => (
                        <OrderCardComponent key={card.ref} card={card} updateQuantity={updateQuantity} remove={removeItemByRefLocal}/>    
                    ))       
                } */}

                </div>
                {
                cards.length > 0 ?
                <div className="checkout">
                        <div className="total-price">
                                <p>TOTAL</p>
                                <p style={{fontSize:'54px'}}>€{cards.reduce((acc, card) => acc + card.price * card.quantity, 0)}</p>
                            </div>
                    <button onClick={openModal} className="checkout-button">CHECKOUT</button>
                </div>
                : null
                }
                <OrderModalComponent enabled={showModal} onCancel={handleCancel} onConfirm={handleConfirm}/>
            </div>             
        </div>

    )  
}

export default OrdersPage;
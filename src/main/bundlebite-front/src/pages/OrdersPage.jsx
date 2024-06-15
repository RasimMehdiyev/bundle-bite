import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import SidebarComponent from "../components/SidebarComponent.jsx";
import OrderCardComponent from "../components/OrderCardComponent.jsx";
import OrderModalComponent from "../components/OrderModalComponent.jsx";
import { useState } from "react";
import {getCurrentUser, submitCart, getCart} from "../auth.js"
import { doc,db,getDoc, query,where,collection,getDocs } from "../firebase-config.js";


// import { addOrder } from "../auth.js";

const OrdersPage = () => {
    const [showModal, setShowModal] = useState("none");
    

    // Define state for cards array
    const [cards, setCards] = useState([
        // { ref: "QmKJGOjroos8Sa45tpyt", quantity: 1 , name:"SHAH PILAF", img:process.env.PUBLIC_URL + "/images/design/souvlaki.png", price:6}, // Initial state for card 1
        // { ref: "kw35uS6JfAqZOeHZyO2C", quantity: 2, name:"VODKA PASTA", img:process.env.PUBLIC_URL + "/images/design/pasta.png", price:8}, // Initial state for card 2
    ]);

    const submitCartLocal = () => {
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
        let order = {
            items: items, // These are now Firestore DocumentReferences
            orderDate: orderDate,
            status: "pending",
            totalPrice: cards.reduce((acc, card) => acc + card.price * card.quantity, 0),
            uid: uid,
            user: doc(db, "users", getCurrentUser().uid) // Convert user reference as well
        }
        console.log(order);
        submitCart(order);
    }
        useEffect(() => {
            const fetchCartItems = async () => {
                const user = getCurrentUser();
                if (user) {
                    const cartsRef = collection(db, "carts");
                    const q = query(cartsRef, where("user", "==", doc(db, "users", user.uid))); // Assuming there's a user field that stores references
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        let fetchedCards = [];
                        for (let doc of querySnapshot.docs) {
                            const data = doc.data();
                            for (let itemRef of data.items) { // Assuming 'items' holds references to the meal documents
                                const mealSnap = await getDoc(itemRef);
                                if (mealSnap.exists()) {
                                    const mealData = mealSnap.data();
                                    fetchedCards.push({
                                        ref: itemRef.id, // Using Firestore document ID
                                        name: mealData.name,
                                        img: mealData.imagePath, // Make sure imagePath exists in the document
                                        price: mealData.price,
                                        quantity: 1 // Default to 1 or adjust as needed
                                    });
                                }
                            }
                        }
                        console.log("Fetched cards:", fetchedCards);
                        setCards(fetchedCards);
                    }
                }
            };
    
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
    

    return(
        <div>
            <div className="page" id="content-div">
            <SidebarComponent username="John Doe"/>
                <div className="orders">
                    <p className="cart-title">YOUR CART</p>
                {cards.map(card => (
                    <OrderCardComponent key={card.ref} card={card} updateQuantity={updateQuantity}/>           
                ))}                
                </div>
                <div className="checkout">
                    <div className="total-price">
                        <p>TOTAL</p>
                        <p style={{fontSize:'54px'}}>€{cards.reduce((acc, card) => acc + card.price * card.quantity, 0)}</p>
                    </div>
                    <button onClick={openModal} className="checkout-button">CHECKOUT</button>
                </div>
                <OrderModalComponent enabled={showModal} onCancel={handleCancel} onConfirm={handleConfirm}/>
            </div>             
        </div>

    )  
}

export default OrdersPage;
import React from "react";
import * as PropTypes from "prop-types";
import SidebarComponent from "../components/SidebarComponent.jsx";
import OrderCardComponent from "../components/OrderCardComponent.jsx";
import OrderModalComponent from "../components/OrderModalComponent.jsx";
import { useState } from "react";
import axios from "axios";
import {getCurrentUser, submitCart} from "../auth.js"

const OrdersPage = () => {

    const [showModal, setShowModal] = useState("none");
    

    // Define state for cards array
    const [cards, setCards] = useState([
        { ref: "QmKJGOjroos8Sa45tpyt", quantity: 1 , name:"SHAH PILAF", img:process.env.PUBLIC_URL + "/images/design/souvlaki.png", price:6}, // Initial state for card 1
        { ref: "kw35uS6JfAqZOeHZyO2C", quantity: 2, name:"VODKA PASTA", img:process.env.PUBLIC_URL + "/images/design/pasta.png", price:8}, // Initial state for card 2
    ]);

    const submitCartLocal = () =>{
        console.log("Cart submitted");
        // put cards in "items":[] using ref to cards
        // ref example: "/BundleBite/card.ref"
        let items = [];
        // based on updated quantity
        cards.forEach(card => {
            for (let i = 0; i < card.quantity; i++) {
                items.push("/BundleBite/" + card.ref);
            }
        });
        
        let orderDate = new Date();
        let uid = "O" + Math.random().toString(36).substr(2, 9).toUpperCase();
        let order = {
            "items": items,
            "orderDate": orderDate,
            "status": "pending",
            "totalPrice": cards.reduce((acc, card) => acc + card.price * card.quantity, 0),
            "uid": uid,
            "user":"/users/" + getCurrentUser().uid
        }
        console.log(order);
        submitCart(order);
    }


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
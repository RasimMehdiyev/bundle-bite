import React from "react";
import * as PropTypes from "prop-types";
import SidebarComponent from "../components/SidebarComponent.jsx";
import OrderCardComponent from "../components/OrderCardComponent.jsx";
import OrderModalComponent from "../components/OrderModalComponent.jsx";
import { useState } from "react";
// import { addOrder } from "../auth.js";

const OrdersPage = () => {

    const [showModal, setShowModal] = useState("none");
    // Define state for cards array
    var [cards, setCards] = useState([
        { id: 0, quantity: 1 , name:"SOUVLAKI", img:process.env.PUBLIC_URL + "/images/design/souvlaki.png", price:6}, // Initial state for card 1
        { id: 1, quantity: 2, name:"VODKA PASTA", img:process.env.PUBLIC_URL + "/images/design/pasta.png", price:8}, // Initial state for card 2
        { id: 2, quantity: 2, name: "PIZZA MARGHERITA", img:process.env.PUBLIC_URL + "/images/design/pizza.png", price:7}    
    ]);

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
        // addOrder(cards);
      };

    // Function to update quantity for a card by ID
    const updateQuantity = (id, newQuantity) => {
            setCards(
                cards.map(card => {
                    if (card.id === id) {
                        console.log("card id: " + card.id + " new quantity: " + newQuantity)
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
        <div className="page" id="content-div">
            <SidebarComponent activeLink="/orders"/>
                <div className="orders">
                    <p className="cart-title">YOUR CART</p>
                {cards.map(card => (
                    <OrderCardComponent key={card.id} card={card} updateQuantity={updateQuantity}/>           
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
    )  
}

export default OrdersPage;
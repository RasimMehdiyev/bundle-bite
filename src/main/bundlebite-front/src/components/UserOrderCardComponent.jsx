import React from "react";
import OrderModalComponent from "./OrderModalComponent";


const UserOrderCardComponent = ({card, updateQuantity}) => {
    const handleIncrease = () => {
        console.log(card.quantity+1);
        var newQuantity = card.quantity + 1;
        updateQuantity(card.id, newQuantity);
    };

    const handleDecrease = () => {
        if (card.quantity > 1) {
            console.log(card.quantity-1);
            updateQuantity(card.id, card.quantity - 1);
        }
    };

    return(

        <div class="order-summary">
              <div class="order-header">
                <span class="order-number">ORDER #{card.uid}</span>
                <span class="user-number">USER #{card.user}</span>
              </div>

              <ul class="order-items">
                {card.items.map((item, index) => {
                    return (
                        <li key={index}>{item.quantity}x {item.name}</li>
                    )
                }
                )}
              </ul>

              <div class="order-details">
                <span class="order-date">PLACED ON {card.orderDate}</span>
                <span class="order-status">STATUS: <strong>{card.status}</strong></span>
                <span class="order-total">TOTAL ${card.totalPrice}</span>
              </div>
        </div>

    )
}

export default UserOrderCardComponent;
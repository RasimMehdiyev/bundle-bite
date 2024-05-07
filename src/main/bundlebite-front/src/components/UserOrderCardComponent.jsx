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
                <span class="order-number">ORDER #25781976</span>
                <span class="user-number">USER #25001976</span>
              </div>

              <ul class="order-items">
                <li>2x VODKA PASTA</li>
                <li>2x BEEF TARTAR</li>
                <li>1x POKE BOWL</li>
              </ul>

              <div class="order-details">
                <span class="order-date">PLACED ON 01/05/2024</span>
                <span class="order-status">STATUS: <strong>Received</strong></span>
                <span class="order-total">TOTAL $62</span>
              </div>
        </div>

    )
}

export default UserOrderCardComponent;
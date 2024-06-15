import React from "react";
import OrderModalComponent from "./OrderModalComponent";


const OrderCardComponent = ({card, updateQuantity}) => {
    const handleIncrease = () => {
        console.log(card.quantity+1);
        var newQuantity = card.quantity + 1;
        updateQuantity(card.ref, newQuantity);
    };

    const handleDecrease = () => {
        if (card.quantity > 1) {
            console.log(card.quantity-1);
            updateQuantity(card.ref, card.quantity - 1);
        }
    };

    return(
    <div className="order-card">
        <div className="order-card-left">
            <img className="trash-svg" src={process.env.PUBLIC_URL + "/images/trash-2.svg"} alt="" />
            <img src={process.env.PUBLIC_URL + card.img} alt="" />
            <span className="order-details">
                <p className="order-name">{card.name.toUpperCase()}</p>
                <span className="details">
                    <button onClick={handleDecrease}>-</button>
                    <input className="button-inverse" value={card.quantity}/>
                    <button onClick={handleIncrease}>+</button>
                </span>
            </span>
        </div>
        <div className="order-card-right">
            <span className="order-price">
                <span className="order-price-calc"> {card.price} x {card.quantity} = </span>
                €{card.price * card.quantity}
                </span>
        </div>
    </div>
    )
}

export default OrderCardComponent;
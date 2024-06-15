import React from "react";
import {useAuth} from "../auth.js";
import { useNavigate } from "react-router-dom";
import {addtoCart} from "../pages/OrdersPage.jsx"

const ProductCard = (props) => {
    const {user,loading,role} = useAuth();
    const navigate = useNavigate();

    const addToCart = () => {
        addToCart(props.id,1);
    }

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
                    <button className="button-text" onClick={addToCart}>ADD TO CART</button>
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
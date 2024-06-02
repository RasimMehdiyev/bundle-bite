import React from "react";
import {useAuth} from "../auth.js";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
    const {user,loading} = useAuth();
    const navigate = useNavigate();

    const addToCart = () => {
        console.log("Add to cart");
    }

    const redirectToHome = () => {
        navigate("/");
    }

    return (
        <div className="product">
            <img className="product-img" src={process.env.PUBLIC_URL + props.img} alt={props.name} />
            <span className="product-name">{props.name}</span>
            <span className="product-price">€{props.price}</span>
            <span className="product-buttons">
                {user ? (
                    <button className="button-text" onClick={addToCart}>ADD TO CART</button>


                ):(
                    <button className="button-text" onClick={redirectToHome}>ADD TO CART</button>
             )}
            </span>
        </div>
    );
}

export default ProductCard;
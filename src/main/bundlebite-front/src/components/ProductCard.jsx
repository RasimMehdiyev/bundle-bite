import React from "react";
import {useAuth} from "../auth.js";
import { useNavigate } from "react-router-dom";
import {addToCartButton} from "../Checkout.js"

const ProductCard = (props) => {
    const {user,loading,role} = useAuth();
    const navigate = useNavigate();

    const addToCart = () => {
        console.log("Add to cart");
        addToCartButton(props.id, [
            { id: 0, quantity: 0 , name:"SOUVLAKI", img:process.env.PUBLIC_URL + "/images/design/souvlaki.png", price:6}, // Initial state for card 1
            { id: "BundleBite/kw35uS6JfAqZOeHZyO2C ", quantity: 0, name:"VODKA PASTA", img:process.env.PUBLIC_URL + "/images/design/pasta.png", price:8}, // Initial state for card 2
            { id: "BundleBite/iVWXKXlFqnYdQO9PT41m", quantity: 0, name: "PIZZA MARGHERITA", img:process.env.PUBLIC_URL + "/images/design/pizza.png", price:7}    ,
            { id: 3, quantity: 0, name: "BURRITO", img:process.env.PUBLIC_URL + "/images/design/burrito.png", price:10},
            { id: 4, quantity: 0, name: "POKE BOWL", img:process.env.PUBLIC_URL + "/images/design/poke.png", price:12},
            { id: 5, quantity: 0, name: "TACO", img:process.env.PUBLIC_URL + "/images/design/taco.png", price:9},
            { id: "BundleBite/fXlirxyJhKYeHRABD7Tj", quantity: 0, name: "VOL-AU-VENT", img:process.env.PUBLIC_URL + "/images/design/volauvent.png", price:11},
            { id: 7, quantity: 0, name: "CHILI CON CARNE", img:process.env.PUBLIC_URL + "/images/design/chili.png", price:13},
            { id: "BundleBite/QmKJGOjroos8Sa45tpyt" , quantity: 0, name: "SHAH PILAF", img:process.env.PUBLIC_URL + "/images/design/shah.png", price:14},
            { id: 9, quantity: 0, name: "SPANAKOPITA", img:process.env.PUBLIC_URL + "/images/design/spanakopita.png", price:15}
        ]);
        navigate("/orders");
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
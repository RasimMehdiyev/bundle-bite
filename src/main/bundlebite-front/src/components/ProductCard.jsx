import React from "react";
import {useAuth} from "../auth.js";
const ProductCard = (props) => {
    const {user,loading} = useAuth();

    return (
        <div className="product">
            <img className="product-img" src={process.env.PUBLIC_URL + props.img} alt={props.name} />
            <span className="product-name">{props.name}</span>
            <span className="product-price">€{props.price}</span>
            <span className="product-buttons">
                {user ? (
                    <button className="button-text">ADD TO CART</button>


                ):(
                    <button className="button-text">ADD TO CART</button>
             )}
            </span>
        </div>
    );
}
//                 <button className="button-text">ORDER</button>
{/* <button className="button-text-inverse">RESERVE</button> */}
export default ProductCard;
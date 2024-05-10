import React from "react";
import * as PropTypes from "prop-types";
import ProductCard from "../components/ProductCard.jsx";
import SidebarComponent from "../components/SidebarComponent.jsx";

ProductCard.propTypes = {
    img: PropTypes.string,
    price: PropTypes.string,
    name: PropTypes.string
};
const Homepage = () => {
    return (
        <div className="page" id="contentdiv">
            <SidebarComponent activeLink="/shop" username="John Doe"/>
            <div className="main-content">
                <h1 className="contentdiv-h1">OUR INGREDIENT BUNDLES</h1>
                <div className="products-grid">
                    <ProductCard img={process.env.PUBLIC_URL + "/images/design/souvlaki.png"} name="SOUVLAKI" price="10" />
                    <ProductCard img={process.env.PUBLIC_URL + "/images/design/shah.png"} name="SHAH PILAF" price="22" />
                    <ProductCard img={process.env.PUBLIC_URL + "/images/design/chili.png"} name="CHILI CON CARNE" price="22" />
                    <ProductCard img={process.env.PUBLIC_URL + "/images/design/poke.png"} name="POKE" price="15" />
                    <ProductCard img={process.env.PUBLIC_URL + "/images/design/taco.png"} name="TACO" price="12" />
                    <ProductCard img={process.env.PUBLIC_URL + "/images/design/volauvent.png"} name="VOL-AU-VENT" price="16" />
                    <ProductCard img={process.env.PUBLIC_URL + "/images/design/burrito.png"} name="BURRITO" price="14" />
                    <ProductCard img={process.env.PUBLIC_URL + "/images/design/pasta.png"} name="VODKA PASTA" price="13" />
                    <ProductCard img={process.env.PUBLIC_URL + "/images/design/pizza.png"} name="PIZZA" price="17" />
                    <ProductCard img={process.env.PUBLIC_URL + "/images/design/spanakopita.png"} name="SPANAKOPITA" price="7" />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
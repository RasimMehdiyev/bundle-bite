import React from "react";
import * as PropTypes from "prop-types";
import ProductCard from "../components/ProductCard.jsx";
import SidebarComponent from "../components/SidebarComponent.jsx";
import axios from 'axios';
import { useState, useEffect } from "react";

ProductCard.propTypes = {
    img: PropTypes.string,
    price: PropTypes.string,
    name: PropTypes.string,
    availability: PropTypes.bool
};

const Homepage = () => {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        // Fetch the meals from the API endpoint
        console.log("test");
        axios.get('/publicApi/homepageMeals')
            .then(response => {
                setMeals(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the meals!", error);
            });
    }, []);

    return (
        <div className="page" id="contentdiv">
            <SidebarComponent activeLink="/shop" username="John Doe"/>
            <div className="main-content">
                <h1 className="contentdiv-h1">OUR INGREDIENT BUNDLES</h1>
                <div className="products-grid">
                    
                    {meals.map(meal => (
                        <ProductCard 
                            key={meal.id} 
                            img={process.env.PUBLIC_URL + "/images/design/" + meal.imagePath} 
                            name={meal.name.toUpperCase()} 
                            price={meal.price.toString()}
                            availability={meal.availability}                            
                        
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
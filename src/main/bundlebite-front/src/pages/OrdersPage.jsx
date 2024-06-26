import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import SidebarComponent from "../components/SidebarComponent.jsx";
import OrderCardComponent from "../components/OrderCardComponent.jsx";
import OrderModalComponent from "../components/OrderModalComponent.jsx";
import { useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../auth.js";
import {addDoc, getDocs, setDoc, doc} from "firebase/firestore"
import { auth, db, collection} from "../firebase-config";

// import { addOrder } from "../auth.js";

const OrdersPage = () => {
    const [showModal, setShowModal] = useState("none");
    // Define state for cards array
    
    var [cards, setCards] = useState([
        { id: 0, quantity: 0 , name:"SOUVLAKI", img:process.env.PUBLIC_URL + "/images/design/souvlaki.png", price:6}, // Initial state for card 1
        { id: 1, quantity: 0, name:"VODKA PASTA", img:process.env.PUBLIC_URL + "/images/design/pasta.png", price:8}, // Initial state for card 2
        { id: 2, quantity: 0, name: "PIZZA MARGHERITA", img:process.env.PUBLIC_URL + "/images/design/pizza.png", price:7}    ,
        { id: 3, quantity: 0, name: "BURRITO", img:process.env.PUBLIC_URL + "/images/design/burrito.png", price:10},
        { id: 4, quantity: 0, name: "POKE BOWL", img:process.env.PUBLIC_URL + "/images/design/poke.png", price:12},
        { id: 5, quantity: 0, name: "TACO", img:process.env.PUBLIC_URL + "/images/design/taco.png", price:9},
        { id: 6, quantity: 0, name: "VOL-AU-VENT", img:process.env.PUBLIC_URL + "/images/design/volauvent.png", price:11},
        { id: 7, quantity: 0, name: "CHILI CON CARNE", img:process.env.PUBLIC_URL + "/images/design/chili.png", price:13},
        { id: 8, quantity: 0, name: "SHAH PILAF", img:process.env.PUBLIC_URL + "/images/design/shah.png", price:14},
        { id: 9, quantity: 0, name: "SPANAKOPITA", img:process.env.PUBLIC_URL + "/images/design/spanakopita.png", price:15}
    ]);

    
    useEffect(() => {
        getfromCart();
    },[]);

    //var[cards,setCards] = useState(getInitialCart);


    const addToCart = async(id, newQuantity) => {
        const user = getCurrentUser();
        console.log(user.uid);
        try {
          // Add a new document with a generated ID to the "Cart" collection
          let ProductList = {
            CartStatus: false,
            Date: Date.toString(),
            ProductL: {
            },
            UserName: user.uid
          };

          cards.forEach(card => {
            if(card.id === id) {
              const Product = {
                Id: card.id,
                quantity: newQuantity,
                name: card.name,
                img: card.img,
                price: card.price
            }
            ProductList.ProductL[card.id] = Product;
          }
            else {
              const Product = {
                Id: card.id,
                quantity: card.quantity,
                name: card.name,
                img: card.img,
                price: card.price
            }
            ProductList.ProductL[card.id] = Product;
            }
          });
          const cartSnapshot = (await getDocs(collection(db, 'Cart')));
          let foundUser = false;
          let PastCart;
          cartSnapshot.forEach(doc =>{
            console.log(doc.data().UserName);
            if(doc.data().UserName == user.uid) {
              PastCart = doc;
              foundUser = true;
              console.log(doc.data());
            }
          }
          );
          if (foundUser === true) {
            console.log("Found User Ref");
            const firstItemRef = doc(db, 'Cart', PastCart.id);
            await setDoc(firstItemRef, ProductList);
          }
          else {
            await addDoc(collection(db, 'Cart'), ProductList);
          }
          
          console.log("Item added to cart successfully");
        } catch (error) {
          console.error("Error adding item to cart: ", error);
        }
      }



    const getfromCart = async() => {
        try {
          const user = getCurrentUser();
          console.log('Getting the user...')
          if (user){
            const cartCollection = collection(db, 'Cart');
            try {
              // Fetch all documents in the "Cart" collection
              const cartSnapshot = await getDocs(cartCollection);
              
              // Loop through the documents and log the data
              cartSnapshot.forEach(doc => {
                if(doc.data().UserName == user.uid) {
                const data = doc.data().ProductL;
                setCards(Object.values(data).map(card => ({
                  id: card.Id,
                  quantity: card.quantity,
                  name: card.name,
                  img: card.img,
                  price: card.price
              })));
                    //console.log(data[i]);
                  }   
                });
                //console.log(doc.id, '=>', doc.data().ProductArray);
              }
            catch (error) {
              console.error("Error fetching cart data: ", error);
            }
          }
      }
      catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    }

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
        //addOrder(cards);
      };

    // Function to update quantity for a card by ID
    const updateQuantity = (id, newQuantity) => {
        addToCart(id,newQuantity);
        //getfromCart();
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
        <div>
            <div className="page" id="content-div">
            <SidebarComponent username="John Doe"/>
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
        </div>

    )  
}

export default OrdersPage;
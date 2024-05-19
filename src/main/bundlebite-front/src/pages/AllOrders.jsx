import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUser } from "../auth.js";


import ManagerSidebar from "../components/ManagerSidebar.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import UserOrderCardComponent from "../components/UserOrderCardComponent.jsx";

const AllOrders = () => {

    const  [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const user = getCurrentUser();
            console.log('Getting the token and fetching orders...')
            // console.log("User:", user);
            if (user){
                const token = await user.getIdToken();
                // console.log("Token:", token);
                console.log("Fetching orders...");
                await axios.get("/api/orders",{
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    console.log(response.data);
                    setOrders(response.data);
                });
            }

        } catch (error) {
            console.error("Error fetching orders:", error.message);
        }
    }
    const fetchByUser = async (user) => {
    try {
        const currentUser = getCurrentUser();
        console.log('Getting the token and fetching orders...');
        // console.log("User:", user);
        if (currentUser) {
            const token = await currentUser.getIdToken();
            // console.log("Token:", token);
            console.log("Fetching by userID ...");
            await axios.get(`/api/orders/by-user/${user}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                console.log(response.data);
                setOrders(response.data);
            });
        }

    } catch (error) {
        console.error("Error fetching orders:", error.message);
    }
    }
    const fetchByOrder = async (order) => {
        try {
            const currentUser = getCurrentUser();
            console.log('Getting the token and fetching orders...');
            if (currentUser) {
                const token = await currentUser.getIdToken();
                console.log("Fetching by order ID...");
                await axios.get(`/api/orders/${order}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    console.log(response.data);
                    // it returns object not array
                    var newOrder = response.data;
                    var newOrders = [];
                    newOrders.push(newOrder);
                    setOrders(newOrders);
                });
            }
    
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        }
        
    }


    useEffect(() => {
        fetchOrders();
    }   , []);
    

    return(
        <div className="all" >
            <ManagerSidebar/>
            <div className="right-section">
                <div className="header-container">
                      <h1 className="header">ORDERS</h1>
                      <div className="search-container">
                          <FontAwesomeIcon icon={faSearch} className="search-icon" />
                          <input className="search-bar" type="text" placeholder="#ORDER"/>
                      </div>
                </div>

                <div className="order-cards">
                    {orders.map((order, index) => {
                        return (
                            <UserOrderCardComponent key={index} card={order} />
                        )
                        }
                    )}
                </div>

                {/* <div>
                    <UserOrderCardComponent card={card} />
                </div> */}

            </div>
        </div>
    );
}

export default AllOrders;
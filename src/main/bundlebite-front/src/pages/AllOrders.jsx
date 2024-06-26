import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUser } from "../auth.js";

import SidebarComponent from "../components/SidebarComponent.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import UserOrderCardComponent from "../components/UserOrderCardComponent.jsx";

const AllOrders = () => {

    const  [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOrder, setIsOrder] = useState("");

    const fetchOrders = async () => {
        try {
            const user = getCurrentUser();
            console.log('Getting the token and fetching orders...')
            if (user){
                const token = await user.getIdToken();
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
                    if(Object.keys(response.data).length === 0)
                    {
                        setIsOrder(false);
                    }

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

    const handleSearchChange = (event) => {
            const value = event.target.value;
            setSearchTerm(value);
            if (value) {
                fetchByOrder(value);
                if (isOrder==false)
                {
                    fetchByUser(value);
                }
            } else {
                fetchOrders();  // Display all orders if search bar is empty
            }
        };


    useEffect(() => {
        fetchOrders();
    }   , []);


    return(
        <div className="all" >
            <SidebarComponent activeLink="/your-orders" username="John Doe"/>
            <div className="right-section">
                <div className="header-container">
                      <h1 className="header">ORDERS</h1>
                      <div className="search-container">
                          <FontAwesomeIcon icon={faSearch} className="search-icon" />
                          <input
                              className="search-bar"
                              type="text"
                              placeholder="#ORDER/USER"
                              value={searchTerm}
                              onChange={handleSearchChange}
                          />
                      </div>
                </div>
                <div className="order-grid">
                    {orders.map(order => (
                        <UserOrderCardComponent
                            key={order.uid}
                            orderId={order.uid}
                            userId={order.user}
                            date={order.orderDate.slice(0,10)}
                            status={order.status}
                            items={order.items}
                            total={order.totalPrice}
                            showUserId="true"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllOrders;
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUser } from "../auth.js";


const AllOrders = () => {

    const  [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const user = getCurrentUser();
            console.log('Getting the token and fetching orders...')
            console.log("User:", user);
            if (user){
                const token = await user.getIdToken();
                console.log("Token:", token);
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

    useEffect(() => {
        fetchOrders();
    }   , []);
    

    return (
        <div>
            <h1>All Orders</h1>
            {orders.map((order, index) => (
                <div key={index}>
                    <h3>Order ID: {order.id}</h3>
                    <p>Order Date: {order.orderDate}</p>
                    <p>Order Status: {order.status}</p>
                    <p>Order Total: {order.total}</p>
                    <p>Order Items:</p>
                    <ul>
                        {order.items && order.items.map((item, idx) => (
                            <li key={idx}>
                                {item.name} - Quantity: {item.quantity} x {item.price} = {item.quantity * item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default AllOrders;
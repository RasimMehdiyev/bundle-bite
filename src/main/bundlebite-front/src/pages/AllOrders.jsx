import React from "react";
import axios from "axios";

const AllOrders = () => {

    const auth = {
        username: 'user',
        password: 'password'
    }


    const fetchOrders = async () => {
        try {
            const response = await axios.get("/api/orders");
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        }
    }

    return(
        <div>
            <h1>All Orders</h1>
            <div className="order">
                <span className="order-id">Order ID: 1</span>
                <span className="order-date">Order Date: 01/01/2021</span>
                <span className="order-status">Order Status: Pending</span>
            </div>
            <div className="order">
                <span className="order-id">Order ID: 2</span>
                <span className="order-date">Order Date: 02/01/2021</span>
                <span className="order-status">Order Status: Shipped</span>
            </div>
            <div className="order">
                <span className="order-id">Order ID: 3</span>
                <span className="order-date">Order Date: 03/01/2021</span>
                <span className="order-status">Order Status: Delivered</span>
            </div>
        </div>
    )
}

export default AllOrders;
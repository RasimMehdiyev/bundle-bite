import React from "react";

import ManagerSidebar from "../components/ManagerSidebar.jsx";

const AllOrders = () => {
    

    return(
        <div className="all" >
            <ManagerSidebar/>
            <div className="right-section">
                <h1 className="header">ORDERS</h1>
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
        </div>
    )
}

export default AllOrders;
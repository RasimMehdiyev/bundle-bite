import React from "react";

import ManagerSidebar from "../components/ManagerSidebar.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import UserOrderCardComponent from "../components/UserOrderCardComponent.jsx";

const AllOrders = () => {
    

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

                <div className="order-grid">
                    <UserOrderCardComponent
                      orderId="25781976"
                      userId="25001976"
                      date="01/05/2024"
                      status="Received"
                      items={[
                          { quantity: 2, name: "VODKA PASTA" },
                          { quantity: 2, name: "BEEF TARTAR" },
                          { quantity: 1, name: "POKE BOWL" }
                        ]}
                      total="62"
                    />

                    <UserOrderCardComponent
                      orderId="25781976"
                      userId="25001976"
                      date="01/05/2024"
                      status="Out for delivery"
                      items={[
                          { quantity: 2, name: "VODKA PASTA" },
                          { quantity: 2, name: "BEEF TARTAR" },
                          { quantity: 1, name: "POKE BOWL" }
                        ]}
                        total="62"
                    />

                     <UserOrderCardComponent
                        orderId="25781976"
                        userId="25001976"
                        date="01/05/2024"
                        status="Confirmed"
                        items={[
                           { quantity: 2, name: "VODKA PASTA" },
                           { quantity: 2, name: "BEEF TARTAR" },
                           { quantity: 1, name: "POKE BOWL" }
                           ]}
                           total="62"
                     />
                </div>

            </div>
        </div>
    )
}

export default AllOrders;
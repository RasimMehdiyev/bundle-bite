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

                <div>
                    <UserOrderCardComponent />
                </div>

            </div>
        </div>
    )
}

export default AllOrders;
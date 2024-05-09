import React from "react";
import ManagerSidebar from "../components/ManagerSidebar.jsx";

const AllUsers = () => {
    return(
        <div className="all">
            <ManagerSidebar activeLink="/all-users"/>
            <div className="customer-list">
                <h1 className="header">CUSTOMERS</h1>
            </div>
        </div>
    )
}

export default AllUsers;
import React from "react";
import ManagerSidebar from "../components/ManagerSidebar.jsx";
import UserCardComponent from "../components/UserCardComponent.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AllUsers = () => {
    return(
        <div className="all">
            <ManagerSidebar activeLink="/all-users"/>
            <div className="customer-list">
                <div className="header-container">
                    <h1 className="header">CUSTOMERS</h1>
                    <div className="search-container">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input className="search-bar" type="text" placeholder="#USER"/>
                    </div>
                </div>
                <UserCardComponent userId="25001976" name="Jane Doe" email="janedoe@gmail.com"/>
                <UserCardComponent userId="25001976" name="Jane Doe" email="janedoe@gmail.com"/>

            </div>
        </div>
    )
}

export default AllUsers;
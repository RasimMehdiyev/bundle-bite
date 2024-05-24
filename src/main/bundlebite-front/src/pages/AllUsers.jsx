import React from "react";
import ManagerSidebar from "../components/ManagerSidebar.jsx";
import UserCardComponent from "../components/UserCardComponent.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth.js";
import axios from "axios";

const AllUsers = () => {

    const  [users, setUsers] = useState([]);


    const fetchAllCustomers = async () => {
        try {
            const user = getCurrentUser();
            console.log('Getting the token and fetching users...')
            if (user){
                const token = await user.getIdToken();
                // console.log("Token:", token);
                console.log("Fetching users...");
                await axios.get("/api/customers",{
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    console.log(response.data);
                    setUsers(response.data);
                });
            }
    
        } catch (error) {
            console.error("Error fetching users:", error.message);
        
        }
    }   

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    return(
        <div className="all">
            <ManagerSidebar activeLink="/all-users" username="Jane Doe"/>
            <div className="customers">
                <div className="header-container">
                    <h1 className="header">CUSTOMERS</h1>
                    <div className="search-container">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input className="search-bar" type="text" placeholder="#USER"/>
                    </div>
                </div>
                <div className="customer-grid">
                    {
                        users.map((user, index) => (
                            <UserCardComponent key={index} userId={user.uid} name={user.name} email={user.email}/>
                        ))
                    
                    }
                    {/* <UserCardComponent userId="U25001976" name="Jane Doe" email="janedoe@gmail.com"/> */}
                </div>

            </div>
        </div>
    )
}

export default AllUsers;
import React, { useEffect, useState } from "react";
import SidebarComponent from "../components/SidebarComponent.jsx"
import UserCardComponent from "../components/UserCardComponent.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getCurrentUser } from "../auth.js";
import axios from "axios";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState(null);

    const fetchAllCustomers = async () => {
        try {
            const user = getCurrentUser();
            console.log('Getting the token and fetching users...');
            if (user) {
                const token = await user.getIdToken();
                console.log("Fetching users...");
                const response = await axios.get("/api/customers", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                console.log(response.data);
                setUsers(response.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    const fetchUserById = async (id) => {
        try {
            const user = getCurrentUser();
            console.log(`Fetching user with ID: ${id}`);
            if (user) {
                const token = await user.getIdToken();
                const response = await axios.get(`/api/customers/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                console.log(response.data);
                setSearchResult(response.data);
            }
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error.message);
        }
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value) {
            fetchUserById(value);
        } else {
            setSearchResult(null); // This line was correct, it sets the search result to null if search is empty
            fetchAllCustomers(); // Fetch all customers again when search is cleared
        }
    };

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    return (
        <div className="all">
            <SidebarComponent activeLink="/your-orders" username="John Doe"/>
            <div className="customers">
                <div className="header-container">
                    <h1 className="header">CUSTOMERS</h1>
                    <div className="search-container">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            className="search-bar"
                            type="text"
                            placeholder="#USER"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="customer-grid">
                    {searchResult ? (
                        <UserCardComponent userId={searchResult.uid} name={searchResult.name} email={searchResult.email} />
                    ) : (
                        users.map((user, index) => (
                            <UserCardComponent key={index} userId={user.uid} name={user.name} email={user.email} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
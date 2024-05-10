import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUser } from "../auth.js";

const AllUsers = () => {

    const  [users, setUsers] = useState([]);


    const fetchAllUsers = async () => {
        try {
            const user = getCurrentUser();
            console.log('Getting the token and fetching users...')
            if (user){
                const token = await user.getIdToken();
                // console.log("Token:", token);
                console.log("Fetching users...");
                await axios.get("/api/users",{
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
        fetchAllUsers();
    }, []);

    return(
        <div>
            <h1>All Users</h1>
            <ul>
                {users.map((user, index) => {
                    return (
                        <li key={index}>
                            <p>{user.email}</p>
                            <p>{user.name}</p>
                            <p>{user.role}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AllUsers;
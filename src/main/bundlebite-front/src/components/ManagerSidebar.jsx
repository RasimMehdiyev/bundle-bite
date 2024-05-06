import React from 'react';
import {useAuth, signOutUser} from "../auth";
import { useNavigate } from 'react-router-dom';
const ManagerSidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        signOutUser();
        navigate("/login");
    }
    const {user,loading} = useAuth();
    return (
        <>
            {user ? (
                <div className='sidebar'>
                    <a href="/profile">YOUR PROFILE</a>
                    <a href="/all-orders">ORDERS</a>
                    <a href="/all-users">USERS</a>
                    <a onClick={(handleLogout)}>LOGOUT</a>
                </div>
            ):(
                <div className='sidebar'>
                    <a href="/profile">YOUR PROFILE</a>
                    <a href="/all-orders">ORDERS</a>
                    <a href="/all-users">USERS</a>
                    <a href="/signup" id="btnSignUp">SIGN UP</a>
                    <a href="/login" id="btnSignIn">SIGN IN</a>
                </div>
            )

            }
        </>
    )
}

export default ManagerSidebar;
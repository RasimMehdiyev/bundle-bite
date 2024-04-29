import React from 'react';
import {useAuth, signOutUser} from "../auth";
import { useNavigate } from 'react-router-dom';
const SidebarComponent = () => {
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
                    <a href="/orders">YOUR ORDERS</a>
                    <a href="/reservations">YOUR RESERVATIONS</a>
                    <a onClick={(handleLogout)}>LOGOUT</a>
                </div>
            ):(
                <div className='sidebar'>
                    <a href="/profile">YOUR PROFILE</a>
                    <a href="/orders">YOUR ORDERS</a>
                    <a href="/reservations">YOUR RESERVATIONS</a>
                    <a href="/signup" id="btnSignUp">SIGN UP</a>
                    <a href="/login" id="btnSignIn">SIGN IN</a>
                </div>
            )

            }
        </>
    )
}

export default SidebarComponent;
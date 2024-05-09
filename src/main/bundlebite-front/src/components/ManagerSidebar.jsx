import React from 'react';
import { useAuth, signOutUser } from "../auth";
import { useNavigate } from 'react-router-dom';

const ManagerSidebar = ({ activeLink }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOutUser();
        navigate("/login");
    }

    const { user } = useAuth();

    return (
        <>
            {user ? (
                <div className='sidebar'>
                    <a
                        href="/profile"
                        className={activeLink === "/profile" ? "active-link" : ""}
                    >YOUR PROFILE</a>
                    <a
                        href="/all-orders"
                        className={activeLink === "/all-orders" ? "active-link" : ""}
                    >ORDERS</a>
                    <a
                        href="/all-users"
                        className={activeLink === "/all-users" ? "active-link" : ""}
                    >USERS</a>
                    <a
                        onClick={() => {
                            handleLogout();
                        }}
                        className={activeLink === "/login" ? "active-link" : ""}
                    >LOGOUT</a>
                </div>
            ) : (
                <div className='sidebar'>
                    <a
                        href="/profile"
                        className={activeLink === "/profile" ? "active-link" : ""}
                    >YOUR PROFILE</a>
                    <a
                        href="/all-orders"
                        className={activeLink === "/all-orders" ? "active-link" : ""}
                    >ORDERS</a>
                    <a
                        href="/all-users"
                        className={activeLink === "/all-users" ? "active-link" : ""}
                    >USERS</a>
                    <a
                        href="/signup"
                        id="btnSignUp"
                        className={activeLink === "/signup" ? "active-link" : ""}
                    >SIGN UP</a>
                    <a
                        href="/login"
                        id="btnSignIn"
                        className={activeLink === "/login" ? "active-link" : ""}
                    >SIGN IN</a>
                </div>
            )}
        </>
    )
}

export default ManagerSidebar;
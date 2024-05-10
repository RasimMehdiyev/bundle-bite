import React from 'react';
import { useAuth, signOutUser } from "../auth";
import { useNavigate } from 'react-router-dom';

const SidebarComponent = ({ activeLink }) => {
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
                        href="/orders"
                        className={activeLink === "/orders" ? "active-link" : ""}
                    >YOUR ORDERS</a>
                    <a
                        onClick={() => {
                            handleLogout();
                        }}
                        className={activeLink === "/login" ? "active-link" : ""}
                    >LOG OUT</a>
                </div>
            ) : (
                <div className='sidebar'>
                    <a
                        href="/profile"
                        className={activeLink === "/profile" ? "active-link" : ""}
                    >YOUR PROFILE</a>
                    <a
                        href="/orders"
                        className={activeLink === "/orders" ? "active-link" : ""}
                    >YOUR ORDERS</a>
                    <a
                        href="/signup"
                        id="btnSignUp"
                        className={activeLink === "/signup" ? "active-link" : ""}
                    >SIGN UP</a>
                    <a
                        href="/login"
                        id="btnSignIn"
                        className={activeLink === "/login" ? "active-link" : ""}
                    >LOG IN</a>
                </div>
            )}
        </>
    )
}

export default SidebarComponent;
import React from 'react';
import { useAuth, signOutUser } from "../auth";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

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
                        style={{ marginTop: '30px' }}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} flip="horizontal" />

                    LOG OUT</a>
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
                        href="/login"
                        id="btnSignIn"
                        className={activeLink === "/login" ? "active-link" : ""}
                        style={{ marginTop: '30px' }}

                    >
                    <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: '8px' }} />
                    LOG IN</a>
                </div>
            )}
        </>
    )
}

export default SidebarComponent;
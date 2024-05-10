import React from 'react';
import { useAuth, signOutUser } from "../auth";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt, faUser} from '@fortawesome/free-solid-svg-icons';

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
                     <div className="login-info">
                         <p style={{fontFamily: 'Inter', color: 'white', fontSize: '22px', marginBottom:'0px'}}>Your are logged in as </p>
                         <div style={{display: 'flex', alignItems:'center'}}>
                             <FontAwesomeIcon icon={faUser} style={{ color: 'white', marginRight: '8px', fontSize: '26px' }} />
                             <p style={{fontFamily: 'Inter', color: 'white', fontSize: '28px', marginTop:'0px', marginBottom:'0px', fontWeight: 'bold'}}>Jane Doe</p>
                         </div>
                         <p style={{fontFamily: 'Inter', color: 'white', fontSize: '17px', marginTop:'0px', marginBottom:'50px', marginLeft:'30px',fontStyle: 'italic'}}>(manager)</p>
                     </div>
                     <a
                         href="/shop"
                         className={activeLink === "/shop" ? "active-link" : ""}
                     >SHOP</a>

                    <a
                        href="/all-orders"
                        className={activeLink === "/all-orders" ? "active-link" : ""}
                    >ORDERS</a>
                    <a
                        href="/all-users"
                        className={activeLink === "/all-users" ? "active-link" : ""}
                    >CUSTOMERS</a>
                    <a
                        onClick={() => {
                            handleLogout();
                        }}
                        className={activeLink === "/login" ? "active-link" : ""}
                        style={{ marginTop: '100px' }}
                    >
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} flip="horizontal" />
                    LOG OUT</a>
                </div>
            ) : (
                <div className='sidebar'>
                     <a
                         href="/shop"
                         className={activeLink === "/shop" ? "active-link" : ""}
                     >SHOP</a>

                    <a
                        href="/login"
                        id="btnSignIn"
                        className={activeLink === "/login" ? "active-link" : ""}
                        style={{ marginTop: '100px' }}
                    >
                    <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: '8px' }} />
                    LOG IN</a>
                </div>
            )}
        </>
    )
}

export default ManagerSidebar;
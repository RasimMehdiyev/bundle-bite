import React from "react";
import { useAuth } from "../auth";

const HeaderComponent = () => {

    const { user, role ,loading, name} = useAuth();


    return (
        <header>
            <div id="headerdiv" className="header-menu">
                <a href="/" className="logo">
                    <img src={process.env.PUBLIC_URL + "/images/logologo.svg"} alt='LOGO' />
                    {process.env.PUBLIC_URL}
                </a>
                {
                    role !== 'manager'?
                    (<a href="/orders">
                    <img className="cart" src={process.env.PUBLIC_URL + "/images/shopping-cart.svg"} alt="" />
                    </a>):
                    (
                        <a></a>
                    )
                }

            </div>
        </header>
    )
}

export default HeaderComponent;
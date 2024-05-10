import React from "react";

const HeaderComponent = () => {
    return (
        <header>
            <div id="headerdiv" className="header-menu">
                <a href="/" className="logo">
                    <img src={process.env.PUBLIC_URL + "/images/logologo.svg"} alt='LOGO' />
                    {process.env.PUBLIC_URL}
                </a>
                {/*
                <div className="nav-menu">
                    <a className="nav-links" href="/">
                        HOME
                    </a>
                    <a className="nav-links" href="/shop">
                        SHOP
                    </a>
                    <a className="nav-links" href="/suppliers">
                        SUPPLIERS
                    </a>
                </div>
                */}


                <a href="">
                    <img className="cart" src={process.env.PUBLIC_URL + "/images/shopping-cart.svg"} alt="" />
                </a>
            </div>
        </header>
    )
}

export default HeaderComponent;
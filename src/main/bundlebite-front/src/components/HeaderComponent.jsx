import React from "react";
import { useAuth, getCartLength, getCurrentUser } from "../auth";
import { useEffect } from "react";
const HeaderComponent = () => {

    const { user, role ,loading, name} = useAuth();
    const [cartLength, setCartLength] = React.useState(0);

    useEffect(() => {
        const fetchCartLength = async () => {
            const length = await getCartLength(user);
            setCartLength(length);
            console.log("Cart length: ", length);
        };
    
        fetchCartLength();
    }, [user]);
   


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
                        {
                            cartLength > 0 ? <img className="cart" src={process.env.PUBLIC_URL + "/images/shopping-cart.svg"} alt="" /> : 
                            <img className="cart" src={process.env.PUBLIC_URL + "/images/shopping_cart.svg"} alt="" /> 
                        }
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
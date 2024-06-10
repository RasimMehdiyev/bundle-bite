import React, { useState } from "react";
import SidebarComponent from "../components/SidebarComponent.jsx";
import UserOrderCardComponent from "../components/UserOrderCardComponent.jsx";
import { getCurrentUser } from "../auth.js";
import { useEffect } from "react";
import axios from "axios";


const YourOrdersPage = () => {


      const [selectedCheckbox, setSelectedCheckbox] = useState('');
      const [orders, setOrders] = useState([]);

      const handleCheckboxChange = (event) => {
        setSelectedCheckbox(event.target.name);
      };

      const isCheckboxChecked = (name) => {
        return selectedCheckbox === name;
      };

      const fetchYourOrders = async () => {
        try {
            const user = getCurrentUser();
            console.log('Getting the token and fetching orders...')
            if (user){
                const token = await user.getIdToken();
                // console.log("Token:", token);
                console.log("Fetching orders...");
                await axios.get("/users/orders/",{
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    console.log(response.data);
                    setOrders(response.data);
                });
            }
    
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        
        }
      }

      useEffect(() => {
        fetchYourOrders();
      }, []);

    return(
        <div className="all" >
            <SidebarComponent activeLink="/your-orders" username="John Doe"/>
            <div className="right-section">
                <div className="header-container">
                      <h1 className="header">YOUR ORDERS</h1>
                      <div className="search-container">
                        <p style={{fontFamily: 'Inter', marginBottom:'0px'}}> SORT BY DATE</p>
                        <form>
                                <label for="checkbox1" style={{ marginRight: '10px', fontSize: '20px'}}>
                                    <input type="checkbox"
                                    name="newest"
                                    checked={isCheckboxChecked('newest')}
                                    onChange={handleCheckboxChange}
                                    style={{fontFamily: 'Inter', transform: "scale(1.5)", marginRight: '10px', verticalAlign: 'middle'}}></input>
                                    NEWEST FIRST
                                </label>

                                <label for="checkbox2" style={{ marginRight: '10px', fontSize: '20px'}}>
                                    <input type="checkbox"
                                    name="oldest"
                                    checked={isCheckboxChecked('oldest')}
                                    onChange={handleCheckboxChange}
                                    style={{fontFamily: 'Inter', transform: "scale(1.5)", marginRight: '10px', verticalAlign: 'middle'}}></input>
                                    OLDEST FIRST
                                </label>
                        </form>
                      </div>
                </div>

                <div className="order-grid">
                    {orders.map((order) => (
                                            <UserOrderCardComponent
                                            orderId={order.uid}
                                            userId={order.user}
                                            date={order.orderDate.slice(0,10)}
                                            status={order.status}
                                            items={order.items}
                                            total={order.totalPrice}
                                            />
                                          ))}
                </div>

            </div>
        </div>



        )
           }


export default YourOrdersPage;
import React, { useEffect, useState } from "react";
import SidebarComponent from "../components/SidebarComponent.jsx";
import axios from "axios";
import UserOrderCardComponent from "../components/UserOrderCardComponent.jsx";
import { useAuth } from "../auth.js";

const YourOrdersPage = () => {


      const [selectedCheckbox, setSelectedCheckbox] = useState('');
      const { user, role, loading } = useAuth();

      const handleCheckboxChange = (event) => {
        setSelectedCheckbox(event.target.name);
      };

      const isCheckboxChecked = (name) => {
        return selectedCheckbox === name;
      };

      const fetchMyOrders = async () => {
        try {
          console.log('Fetching orders...');
          console.log(user);
          await axios.get(`/user/your-orders/${user.uid}`)
          .then(response => {
            console.log(response.data);
          });
        } catch (error) {
          console.error("Error fetching orders:", error.message);
        }          
      }

      useEffect(() => {
        fetchMyOrders();
      }
      , []);




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
                    <UserOrderCardComponent
                      orderId="O25781976"
                      userId="U25001976"
                      date="01/05/2024"
                      status="Received"
                      items={[
                          { quantity: 2, name: "VODKA PASTA" },
                          { quantity: 2, name: "BEEF TARTAR" },
                          { quantity: 1, name: "POKE BOWL" }
                        ]}
                      total="62"
                    />

                    <UserOrderCardComponent
                      orderId="O25781976"
                      userId="U25001976"
                      date="01/05/2024"
                      status="Out for delivery"
                      items={[
                          { quantity: 2, name: "VODKA PASTA" },
                          { quantity: 2, name: "BEEF TARTAR" },
                          { quantity: 1, name: "POKE BOWL" }
                        ]}
                        total="62"
                    />

                     <UserOrderCardComponent
                        orderId="O25781976"
                        userId="U25001976"
                        date="01/05/2024"
                        status="Confirmed"
                        items={[
                           { quantity: 2, name: "VODKA PASTA" },
                           { quantity: 2, name: "BEEF TARTAR" },
                           { quantity: 1, name: "POKE BOWL" }
                           ]}
                           total="62"
                     />

                     <UserOrderCardComponent
                         orderId="O25781976"
                         userId="U25001976"
                         date="01/05/2024"
                         status="Confirmed"
                         items={[
                            { quantity: 2, name: "VODKA PASTA" },
                            { quantity: 2, name: "BEEF TARTAR" },
                            { quantity: 1, name: "POKE BOWL" }
                            ]}
                            total="62"
                      />

                     <UserOrderCardComponent
                         orderId="O25781976"
                         userId="U25001976"
                         date="01/05/2024"
                         status="Confirmed"
                         items={[
                            { quantity: 2, name: "VODKA PASTA" },
                            { quantity: 2, name: "BEEF TARTAR" },
                            { quantity: 1, name: "POKE BOWL" }
                            ]}
                            total="62"
                     />

                     <UserOrderCardComponent
                         orderId="O25781976"
                         userId="U25001976"
                         date="01/05/2024"
                         status="Confirmed"
                         items={[
                             { quantity: 2, name: "VODKA PASTA" },
                             { quantity: 2, name: "BEEF TARTAR" },
                             { quantity: 1, name: "POKE BOWL" }
                             ]}
                             total="62"
                      />
                </div>

            </div>
        </div>



        )
           }


export default YourOrdersPage;
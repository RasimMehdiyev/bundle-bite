import React from "react";
import SidebarComponent from "../components/SidebarComponent.jsx";
import UserOrderCardComponent from "../components/UserOrderCardComponent.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const YourOrdersPage = () => {


    return(
        <div className="all" >
            <SidebarComponent activeLink="/all-orders"/>
            <div className="right-section">
                <div className="header-container">
                      <h1 className="header">YOUR ORDERS</h1>
                      <div className="search-container">
                         <FontAwesomeIcon icon={faSearch} className="search-icon" />
                         <input className="search-bar" type="text" placeholder="#ORDER"/>
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
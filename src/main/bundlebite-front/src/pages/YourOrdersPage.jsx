import React, { useState } from "react";
import SidebarComponent from "../components/SidebarComponent.jsx";
import UserOrderCardComponent from "../components/UserOrderCardComponent.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const YourOrdersPage = () => {


      const [selectedCheckbox, setSelectedCheckbox] = useState('');


      const handleCheckboxChange = (event) => {
        setSelectedCheckbox(event.target.name);
      };

      const isCheckboxChecked = (name) => {
        return selectedCheckbox === name;
      };



    return(
        <div className="all" >
            <SidebarComponent activeLink="/all-orders"/>
            <div className="right-section">
                <div className="header-container">
                      <h1 className="header">YOUR ORDERS</h1>
                      <div className="search-container">
                        <p style={{fontFamily: 'Inter', marginBottom:'0px'}}> SORT BY</p>
                        <form>
                                <label for="checkbox1" style={{ marginRight: '10px', fontSize: '20px'}}>
                                    <input type="checkbox"
                                    name="date"
                                    checked={isCheckboxChecked('date')}
                                    onChange={handleCheckboxChange}
                                    style={{fontFamily: 'Inter', transform: "scale(1.5)", marginRight: '10px', verticalAlign: 'middle'}}></input>
                                    DATE
                                </label>

                                <label for="checkbox2" style={{ marginRight: '10px', fontSize: '20px'}}>
                                    <input type="checkbox"
                                    name="price"
                                    checked={isCheckboxChecked('price')}
                                    onChange={handleCheckboxChange}
                                    style={{fontFamily: 'Inter', transform: "scale(1.5)", marginRight: '10px', verticalAlign: 'middle'}}></input>
                                    PRICE
                                </label>
                        </form>

                      </div>

                      {/*
                      <div className="search-container">
                           <FontAwesomeIcon icon={faSearch} className="search-icon" />
                           <input className="search-bar" type="text" placeholder="#ORDER"/>
                      </div>
                      */}
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
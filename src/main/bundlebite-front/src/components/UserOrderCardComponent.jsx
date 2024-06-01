import React, { useState } from "react";
import UserModalComponent from "./UserModalComponent";



const UserOrderCardComponent = ({
    orderId,
      userId,
      date,
      status,
      items,
      total,
      showUserId,
      }) => {


    const statusColors = {
      "Received": "#D9D9D9",
      "Confirmed": "#654BFF",
      "Out for delivery": "#4BFFFF",
      "Delivered": "#4BFF53",
    };

    const [isModalOpen, setIsModalOpen] = useState(false);


        const openModal = () => {
            setIsModalOpen(true);
        };


        const closeModal = () => {
            setIsModalOpen(false);
        };


      const groupedItems = items.reduce((acc, item) => {
        if (acc[item.name]) {
          acc[item.name].quantity += 1;
        } else {
          acc[item.name] = {
            name: item.name,
            quantity: 1,
          };
        }
        console.log(acc);
        return acc;
      }
      , {});

      const itemsArray = Object.values(groupedItems);
    

    const statusCircleColor = statusColors[status] || "#D9D9D9";

    return(

        <div class="order-summary">
              <div class="order-header">
                <span class="order-number">ORDER #{orderId}</span>
                {showUserId && (
                          <span
                            className="user-number"
                            style={{ cursor: "pointer", textDecoration: "underline" }}
                            onClick={openModal}
                          >
                            USER #{userId}
                          </span>
                        )}
              </div>

              <div class="under-header">
                  <ul class="order-items">
                    {itemsArray.map((item, index) => (
                                <li key={index}>
                                  {item.quantity} x {item.name}
                                </li>
                    ))}
                  </ul>

                  <div class="order-details">
                    <span class="order-date">PLACED ON {date}</span>
                    <span class="order-status">
                      STATUS:
                      <span
                         className="status-circle"
                          style={{
                              backgroundColor: statusCircleColor,
                          }}
                          ></span>
                      <strong>{status}</strong>
                    </span>
                    <span class="order-total">TOTAL <span class="order-amount">${total}</span></span>
                  </div>

              </div>
              <UserModalComponent enabled={isModalOpen ? "block" : "none"} onCancel={closeModal} userId={userId} name="Jane Doe" email="janedoe@gmail.com"/>
        </div>

    )
}

export default UserOrderCardComponent;
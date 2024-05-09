import React from "react";
import OrderModalComponent from "./OrderModalComponent";



const UserOrderCardComponent = ({
    orderId,
      userId,
      date,
      status,
      items,
      total,
      }) => {

    const statusColors = {
      "Received": "#D9D9D9",
      "Confirmed": "#654BFF",
      "Out for delivery": "#4BFFFF",
      "Delivered": "#4BFF53",
    };

    const statusCircleColor = statusColors[status] || "#D9D9D9";

    return(

        <div class="order-summary">
              <div class="order-header">
                <span class="order-number">ORDER #{orderId}</span>
                <span class="user-number">USER #{userId}</span>
              </div>

              <div class="under-header">
                  <ul class="order-items">
                    {items.map((item, index) => (
                                <li key={index}>
                                  {item.quantity}x {item.name}
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
        </div>

    )
}

export default UserOrderCardComponent;
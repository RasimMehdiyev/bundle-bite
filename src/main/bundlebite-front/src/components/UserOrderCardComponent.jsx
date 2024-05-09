import React from "react";
import OrderModalComponent from "./OrderModalComponent";


const UserOrderCardComponent = ({card, updateQuantity}) => {


    return(

        <div class="order-summary">
              <div class="order-header">
                <span class="order-number">ORDER #25781976</span>
                <span class="user-number">USER #25001976</span>
              </div>

              <div class="under-header">
                  <ul class="order-items">
                    <li>2x VODKA PASTA</li>
                    <li>2x BEEF TARTAR</li>
                    <li>1x POKE BOWL</li>
                  </ul>

                  <div class="order-details">
                    <span class="order-date">PLACED ON 01/05/2024</span>
                    <span class="order-status">
                      STATUS:
                      <span class="status-circle"></span>
                      <strong>Received</strong>
                    </span>
                    <span class="order-total">TOTAL <span class="order-amount">$62</span></span>
                  </div>

              </div>
        </div>

    )
}

export default UserOrderCardComponent;
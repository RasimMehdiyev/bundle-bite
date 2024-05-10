import React, { useState } from "react";
import UserModalComponent from "./UserModalComponent";


const UserCardComponent = ({
      userId,
      name,
      email,
      }) => {



    return(

        <div class="user-card">
              <p className="user-card-header">
                    USER #{userId}
              </p>

              <div className="user-card-content">
                  <div className="user-details">
                      <p> {name} </p>
                      <p>{email} </p>
                  </div>
              </div>

        </div>

    )
}


export default UserCardComponent;
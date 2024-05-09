import React from "react";


const UserModalComponent = ({enabled, onCancel, userId, name, email}) => {


    const handleCancel = () => {
        onCancel();
    }


    return(
        <div className="user-modal-bg" style={{display: enabled}}>
            <div className="user-modal">
                <div className="modal-header">

                    <p>USER #{userId}</p>
                    <div class="cancel-button">
                        <img onClick={handleCancel} src={process.env.PUBLIC_URL + "images/design/X_orange.svg"} alt="" />
                    </div>
                </div>

                <div className="user-details">
                      <p>{name}</p>
                      <p>{email}</p>
                 </div>
            </div>
        </div>
    )

}

export default UserModalComponent;
import React from "react";


const UserModalComponent = ({enabled, onCancel, onConfirm}) => {

    const handleCancel = () => {
        onCancel();
    }


    return(
        <div className="user-modal-bg" style={{display: enabled}}>
            <div className="user-modal">
                <div class="cancel-button">
                    <img onClick={handleCancel} src={process.env.PUBLIC_URL + "images/design/X_orange.svg"} alt="" />
                </div>

                <p className="user-nr">USER #267890</p>
                <div className="user-details">
                      <p>Jane Doe</p>
                      <p>janedoe@gmail.com</p>
                 </div>
            </div>
        </div>
    )

}

export default UserModalComponent;
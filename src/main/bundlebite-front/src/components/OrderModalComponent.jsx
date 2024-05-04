import React from "react";


const OrderModalComponent = ({enabled, onCancel, onConfirm}) => {

    const handleCancel = () => {
        onCancel();         
    }

    const handleConfirm = () => {
        onConfirm();
    }

    return(
        <div className="modal-background" style={{display: enabled}}>
            <div className="order-modal">
            <div className="cancel-svg">            
                <img onClick={handleCancel} src={process.env.PUBLIC_URL + "images/design/X.svg"} alt="" />
            </div>
            <p>Are you sure you want to place this order?</p>
            <div className="order-modal-buttons">
                <button onClick={handleCancel} className="order-modal-cancel">CANCEL</button>
                <button onClick={handleConfirm} className="order-modal-confirm">YES</button>
            </div>
        </div>
        </div>
    )

}

export default OrderModalComponent;
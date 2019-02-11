import React from 'react';
import Modal from "../UI/Modal/Modal";
import OrderButton from "./OrderButton/OrderButton";
import OrderSummary from "./OrderSummary/OrderSummary";


function Order(props) {
    return <div className="Order">
        <OrderButton disabled={!props.purchasable} click={props.purchaseHandler}/>
        <Modal show={props.purchasing} cancel={props.cancelHandler}>
            <OrderSummary
                ingredients={props.ingredients}
                price={props.total}
                purchaseContinue={props.successHandler}
                purchaseCancel={props.cancelHandler}
            />
        </Modal>
    </div>
}


export default Order;
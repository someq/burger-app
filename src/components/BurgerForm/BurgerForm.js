import React from 'react';
import OrderButton from './OrderButton/OrderButton';
import Modal from '../UI/Modal/Modal';
import OrderSummary from "./OrderSummary/OrderSummary";


function BurgerForm(props) {
    return <div className="panel">
        <p className="total">Итого: {props.total}</p>
        <div>
            {props.children}
        </div>
        <OrderButton disabled={!props.isPurchasable} click={props.purchaseHandler}/>
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


export default BurgerForm

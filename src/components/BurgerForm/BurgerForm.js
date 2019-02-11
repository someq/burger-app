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
        <OrderButton disabled={!props.isPurchasable}/>
        <Modal>
            <OrderSummary
                ingredients={props.ingredients}
                price={props.total}
            />
        </Modal>
    </div>
}


export default BurgerForm

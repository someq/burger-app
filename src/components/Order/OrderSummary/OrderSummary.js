import React from 'react';
import Button from '../../UI/Button/Button';


const OrderSummary = props => {
    const ingredientSummary = props.ingredients.map(ingredient => {
        return <li key={ingredient.name}>
            <span style={{textTransform: 'capitalize'}}>{ingredient.name}</span>: {ingredient.amount}
        </li>;
    });

    return (
        <div>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price} KGS</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </div>
    )
};


export default OrderSummary;

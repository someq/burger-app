import React from 'react';
import IngredientControl from "./IngredientControl/IngredientControl";


function BurgerForm(props) {
    return <div className="panel">
        <p className="total">Итого: {props.total}</p>
        <div>
            {props.ingredients.map(item => <IngredientControl
                ingredient={item}
                key={item.name}
                changeIngredient={props.changeIngredient}
            />)}
        </div>
    </div>
}


export default BurgerForm

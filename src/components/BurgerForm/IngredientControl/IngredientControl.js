import React from 'react';


function IngredientControl(props) {
    const {name, label, amount, total} = props.ingredient;
    let disabled = amount <= 0;
    return <p className='form-control'>
        <span>{label}</span>
        <span>x{amount} = {total}</span>
        <span><button onClick={() => props.changeIngredient(name, -1)} disabled={disabled}>Меньше</button></span>
        <span><button onClick={() => props.changeIngredient(name, +1)}>Больше</button></span>
    </p>
}


export default IngredientControl;

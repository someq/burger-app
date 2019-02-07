import React from 'react';


function IngredientControl(props) {
    const {name, label, amount, total} = props.ingredient;
    let disabled = amount <= 0;
    return <p>
        <span style={{width:'75px', padding:'0 5px', display:'inline-block'}}>{label}</span>
        <span style={{width:'75px', padding:'0 5px', display:'inline-block'}}>x{amount} = {total}</span>
        <button style={{width:'75px', padding:'0 5px', display:'inline-block'}} onClick={() => props.changeIngredient(name, -1)} disabled={disabled}>Меньше</button>
        <button style={{width:'75px', padding:'0 5px', display:'inline-block'}} onClick={() => props.changeIngredient(name, +1)}>Больше</button>
    </p>
}


export default IngredientControl;

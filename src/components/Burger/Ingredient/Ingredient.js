import React from 'react';


function Ingredient(props) {
    let pieces = [];

    for (let i = 0; i < props.ingredient.amount; i++) {
        pieces.push(<div className={props.ingredient.className} key={i}/>)
    }

    return pieces;
}


export default Ingredient;

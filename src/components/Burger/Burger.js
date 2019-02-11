import React from 'react';
import Ingredient from "./Ingredient/Ingredient";


function Burger(props) {
    return <div className="Burger">
        <div className="BreadTop">
            <div className="Seeds1"/>
            <div className="Seeds2"/>
        </div>
        {props.ingredients.map(item => <Ingredient ingredient={item} key={item.name}/>)}
        <div className="BreadBottom"/>
    </div>
}


export default Burger

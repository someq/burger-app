import React from 'react';
import Bacon from './Bacon/Bacon';
import Cheese from './Cheese/Cheese';
import Meat from './Meat/Meat';
import Salad from './Salad/Salad';


function Burger(props) {
    // распаковка ключей props.ingredients в 4 переменных: salad, meat, cheese, bacon
    // props.ingredients приходит из state.ingredients компонента App.js
    const {salad, meat, cheese, bacon} = props.ingredients;

    // создаём массивы из компонентов Salad, Meat, Cheese и Bacon,
    // используя количество, указанное в свойстве count каждого ингредиента.
    // на самом деле здесь можно обойтись одним массивом
    // и добавлять все новые элементы в один и тот же массив ingredients.
    let salads = [];
    for (let i = 0; i < salad.count; i++) salads.push(<Salad/>);
    let meats = [];
    for (let i = 0; i < meat.count; i++) meats.push(<Meat/>);
    let cheeses = [];
    for (let i = 0; i < cheese.count; i++) cheeses.push(<Cheese/>);
    let bacons = [];
    for (let i = 0; i < bacon.count; i++) bacons.push(<Bacon/>);

    return <div className="Burger">
        <div className="BreadTop">
            <div className="Seeds1"/>
            <div className="Seeds2"/>
        </div>
        {salads}
        {bacons}
        {cheeses}
        {meats}
        <div className="BreadBottom"/>
    </div>
}


export default Burger

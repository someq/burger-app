import React from 'react';


// Бонус 2 - общий компонент для вывода всех ингредиентов.
// имя класса для отображения каждого вида ингредиентов хранится в свойстве
// className объектов, представляющих ингредиенты в state.ingredients.

// дополнительно в этот компонент перенесена логика по построению
// списка ингредиентов на основе их количества.
// теперь он возвращает столько <div>-ов для каждого
// ингредиента, сколько их указано в ingredient.amount.

function Ingredient(props) {
    let pieces = [];

    for (let i = 0; i < props.ingredient.amount; i++) {
        pieces.push(<div className={props.ingredient.className} key={i}/>)
    }

    return pieces;
}


export default Ingredient;

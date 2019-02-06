import React, {Component} from 'react';
import './App.css';
import Burger from './components/Burger/Burger';
import Ingredient from "./components/Burger/Ingredient/Ingredient";


// список доступных ингредиентов
const availableIngredients = [
    {name: 'salad', price: 5, label: 'Салат', className: 'Salad'},
    {name: 'cheese', price: 20, label: 'Сыр', className: 'Cheese'},
    {name: 'meat', price: 30, label: 'Мясо', className: 'Meat'},
    {name: 'bacon', price: 20, label: 'Бекон', className: 'Bacon'}
];


class App extends Component {
    state = {
        ingredients: [
            {name: 'salad', count: 1, price: 5, className: 'Salad'},
            {name: 'meat', count: 1, price: 30, className: 'Meat'}
        ]
    };

    changeIngredient = (name, amount, price) => {
        let ingredient = this.state.ingredients.find(item => item.name === name);
        if(ingredient) ingredient = {...ingredient};
        else {
            let ingredientInfo = availableIngredients.find(item => item.name === name);
            ingredient = {name: 'name', count: 0, price: 0, className: ingredientInfo.className};
        }

        ingredient.count += amount;
        if(ingredient.count < 0) ingredient.count = 0;
        ingredient.price = ingredient.count * price;

        let ingredients = [...this.state.ingredients, ingredient];
        let state = {...this.state, ingredients};
        this.setState(state);
    };

    getIngredients = () => {
        let ingredients = [];
        for (let i = 0; i < this.state.ingredients.length; i++) {
            let ingredient = this.state.ingredients[i];
            for (let j = 0; j < ingredient.count; j++) {
                ingredients.push(<Ingredient className={ingredient.className}/>)
            }
        }
        return ingredients;
    };

    getTotal = () => {
        return 20 + this.state.ingredients.reduce((total, ingredient) => total + ingredient.price, 0);
    };

    render() {
        return (
            <div className="App">
                <Burger>
                    {this.getIngredients()}
                </Burger>
                <div class="panel">
                    <p class="total">Total: {this.getTotal()}</p>
                </div>
                {/* здесь вывести панель с общей ценой */}
                {/* для подсчёта цены можно добавить метод в App.js */}
                {/* и вызвать его в фигурных скобках в JSX, */}
                {/* чтобы получить и вывести результат. */}
                {/* под ценой вывести форму BurgerForm */}
                {/* в форме вывести IngredientControl для каждого ингредиента */}
            </div>
        );
    }
}

export default App;

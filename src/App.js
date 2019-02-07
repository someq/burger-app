import React, {Component} from 'react';
import './App.css';
import Burger from './components/Burger/Burger';
import Ingredient from "./components/Burger/Ingredient/Ingredient";
import BurgerForm from "./components/BurgerForm/BurgerForm";
import IngredientControl from "./components/BurgerForm/IngredientControl/IngredientControl";


// список доступных ингредиентов
const AVAILABLE_INGREDIENTS = [
    {name: 'salad', price: 5, label: 'Салат', className: 'Salad', order: 30},
    {name: 'cheese', price: 20, label: 'Сыр', className: 'Cheese', order: 20},
    {name: 'meat', price: 30, label: 'Мясо', className: 'Meat', order: 10},
    {name: 'bacon', price: 20, label: 'Бекон', className: 'Bacon', order: 40}
];

// ингредиенты по умолчанию
const DEFAULT_INGREDIENTS = [
    {name: 'meat', amount: 1},
    {name: 'salad', amount: 1}
];


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.state.ingredients = AVAILABLE_INGREDIENTS.map(item => {
            let ingredient = {...item};
            let defaultIngredient = DEFAULT_INGREDIENTS.find(item => ingredient.name === item.name);
            ingredient.amount = defaultIngredient ? defaultIngredient.amount : 0;
            ingredient.total = ingredient.price * ingredient.amount;
            return ingredient;
        });

        this.state.ingredients.sort((first, last) => last.order - first.order)
    }

    changeIngredient = (name, amount) => {
        let index = this.state.ingredients.findIndex(item => item.name === name);
        let ingredient = {...this.state.ingredients[index]};

        ingredient.amount += amount;
        if(ingredient.amount < 0) ingredient.amount = 0;
        ingredient.total = ingredient.amount * ingredient.price;

        let ingredients = [...this.state.ingredients];
        ingredients[index] = ingredient;

        let state = {...this.state, ingredients};
        this.setState(state);
    };

    getTotal = () => {
        return 20 + this.state.ingredients.reduce((total, ingredient) => total + ingredient.total, 0);
    };

    render() {
        return (
            <div className="App">
                <Burger>
                    {this.state.ingredients.map(item => <Ingredient ingredient={item} key={item.name}/>)}
                </Burger>
                <BurgerForm total={this.getTotal()}>
                    {this.state.ingredients.map(item => <IngredientControl ingredient={item} key={item.name}
                                                                           changeIngredient={this.changeIngredient}/>)}
                </BurgerForm>
            </div>
        );
    }
}

export default App;

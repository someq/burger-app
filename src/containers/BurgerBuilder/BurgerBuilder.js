import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerForm from "../../components/BurgerForm/BurgerForm";
import Order from "../../components/Order/Order";


const AVAILABLE_INGREDIENTS = [
    {name: 'salad', price: 5, label: 'Салат', className: 'Salad', order: 20},
    {name: 'cheese', price: 20, label: 'Сыр', className: 'Cheese', order: 30},
    {name: 'meat', price: 35, label: 'Мясо', className: 'Meat', order: 50},
    {name: 'bacon', price: 20, label: 'Бекон', className: 'Bacon', order: 10},
    {name: 'chicken', price: 30, label: 'Курица', className: 'Chicken', order: 40}
];


const DEFAULT_INGREDIENTS = [
    {name: 'meat', amount: 1},
    {name: 'salad', amount: 1}
];


const BREAD_PRICE = 20;


class BurgerBuilder extends Component {
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

        this.state.ingredients.sort((first, last) => first.order - last.order);

        this.state.purchasable = true;
        this.state.purchasing = false;
        this.state.total = this.getTotal(this.state.ingredients);
    }

    changeIngredient = (name, amount) => {
        let index = this.state.ingredients.findIndex(item => item.name === name);
        let ingredient = {...this.state.ingredients[index]};

        ingredient.amount += amount;
        if (ingredient.amount < 0) ingredient.amount = 0;
        ingredient.total = ingredient.amount * ingredient.price;

        let ingredients = [...this.state.ingredients];
        ingredients[index] = ingredient;
        let state = {...this.state, ingredients};

        this.setState(state);

        this.updatePurchasableState(ingredients);
        this.updateTotalState(ingredients);
    };

    updatePurchasableState = (ingredients) => {
        const count = ingredients.reduce(
            (sum, ingredient) => sum + ingredient.amount,
            0
        );
        this.setState({purchasable: count > 0})
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    cancelHandler = () => {
        this.setState({purchasing: false});
    };

    successHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            const ingredient = this.state.ingredients[i];

            queryParams.push(
                encodeURIComponent(i) + '=' +
                encodeURIComponent(JSON.stringify(ingredient))
            );
        }

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

        this.setState({purchasing: false});
    };

    updateTotalState = (ingredients) => {
        const total = this.getTotal(ingredients);
        this.setState({total: total});
    };

    getTotal = (ingredients) => {
        return ingredients.reduce(
            (total, ingredient) => total + ingredient.total,
            BREAD_PRICE
        );
    };

    render() {
        return <Fragment>
            <Burger ingredients={this.state.ingredients}/>
            <BurgerForm
                total={this.state.total}
                ingredients={this.state.ingredients}
                changeIngredient={this.changeIngredient}
            />
            <Order
                purchasable={this.state.purchasable}
                purchaseHandler={this.purchaseHandler}
                purchasing={this.state.purchasing}
                ingredients={this.state.ingredients}
                total={this.state.total}
                cancelHandler={this.cancelHandler}
                successHandler={this.successHandler}
            />
        </Fragment>
    }
}


export default BurgerBuilder

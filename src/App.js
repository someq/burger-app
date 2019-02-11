import React, {Component} from 'react';
import './App.css';
import Burger from './components/Burger/Burger';
import Ingredient from "./components/Burger/Ingredient/Ingredient";
import BurgerForm from "./components/BurgerForm/BurgerForm";
import IngredientControl from "./components/BurgerForm/IngredientControl/IngredientControl";
import Order from "./components/Order/Order";
import OrderButton from './components/Order/OrderButton/OrderButton';
import OrderSummary from "./components/Order/OrderSummary/OrderSummary";
import Modal from "./components/UI/Modal/Modal";


// список доступных ингредиентов
const AVAILABLE_INGREDIENTS = [
    {name: 'salad', price: 5, label: 'Салат', className: 'Salad', order: 20},
    {name: 'cheese', price: 20, label: 'Сыр', className: 'Cheese', order: 30},
    {name: 'meat', price: 35, label: 'Мясо', className: 'Meat', order: 50},
    {name: 'bacon', price: 20, label: 'Бекон', className: 'Bacon', order: 10},
    {name: 'chicken', price: 30, label: 'Курица', className: 'Chicken', order: 40}
];

// ингредиенты по умолчанию
const DEFAULT_INGREDIENTS = [
    {name: 'meat', amount: 1},
    {name: 'salad', amount: 1}
];

// цена булочки с соусами (пустой бургер)
const BREAD_PRICE = 20;


class App extends Component {

    // Бонус 3 - конструктор
    // подобный способ построения state позволяет настраивать всё приложение,
    // меняя несколько констант в одном только месте кода.
    constructor(props) {
        super(props);

        this.state = {};

        // state копирует все ингредиенты из AVAILABLE_INGREDIENTS
        this.state.ingredients = AVAILABLE_INGREDIENTS.map(item => {
            // копируем ингридиент
            let ingredient = {...item};

            // проверяем, есть ли такой ингредиент в DEFAULT_INGREDIENTS
            let defaultIngredient = DEFAULT_INGREDIENTS.find(item => ingredient.name === item.name);
            // если есть, то записываем в соответствующий ингредиент в state его количество
            // иначе - количество = 0
            ingredient.amount = defaultIngredient ? defaultIngredient.amount : 0;
            // подсчитываем текущую цену ингредиента (сумму с учётом количества)
            // цену можно считать и в методе getTotal, тогда будет меньше расход памяти,
            // т.к. не нужно будет хранить промежуточные суммы, но больше - процессорного времени,
            // т.к. все суммы придётся вычислять каждый раз при изменении хотя бы одного ингредиента.
            ingredient.total = ingredient.price * ingredient.amount;

            // например, салат в списке ингредиентов будет выглядеть так:
            // {name: 'salad', price: 5, label: 'Салат', className: 'Salad', order: 30, amount: 1, total: 5}

            // возвращаем ингредиент из коллбэка map, чтобы map мог добавить его в новый массив,
            // который будет присвоен в state.ingredients
            return ingredient;
        });

        // сортируем ингредиенты бургера в том порядке, в каком они лежат в бургере
        // ингредиенты, которые в бургере лежат выше, в массиве должны быть в начале
        this.state.ingredients.sort((first, last) => first.order - last.order);

        this.state.isPurchasable = true;
        this.state.purchasing = false;
        this.state.total = this.getTotal(this.state.ingredients);
    }

    // Бонус 2 - общий метод для изменения количества ингредиента вместо addIngredient и removeIngredient.
    // добавляем в него аргумент amount, в котором можно передать положительное или отрицательное количество
    // ингредиента, на которое нужно изменить количество ингредиента с именем name.
    changeIngredient = (name, amount) => {
        // находим индекс ингредиента с именем name в массиве ingredients
        let index = this.state.ingredients.findIndex(item => item.name === name);
        // находим и копируем сам ингредиент по найденному индексу
        let ingredient = {...this.state.ingredients[index]};

        // в методе changeIngredient всегда прибавляем amount к ingredient.amount
        // если amount отрицательный, то ingredient.amount станет меньше.
        ingredient.amount += amount;
        // если итоговое количество упало ниже нуля, то делаем его нулём.
        // бургер с отрицательным количеством ингредиентов в природе не существует.
        if (ingredient.amount < 0) ingredient.amount = 0;
        // пересчитываем итоговую цену за этот ингредиент.
        ingredient.total = ingredient.amount * ingredient.price;

        // копируем список ингредиентов
        let ingredients = [...this.state.ingredients];
        // заменяем найденный ингредиент на новый по индексу в массиве ingredients
        ingredients[index] = ingredient;

        // копируем state и заменяем в нём ingredients на новый (копию)
        let state = {...this.state, ingredients};

        // заменяем state на новый, чтобы изменения появились на странице.
        this.setState(state);

        // this.updatePurchasableState(state);
        this.updatePurchasableState(ingredients);
        this.updateTotalState(ingredients);
    };

    // updatePurchasableState = (state) => {
    //     const count = state.ingredients.reduce(
    //         (sum, ingredient) => sum + ingredient.amount,
    //         0
    //     );
    //     this.setState({
    //         ...state,
    //         isPurchasable: count > 0
    //     })
    // };

    updatePurchasableState = (ingredients) => {
        const count = ingredients.reduce(
            (sum, ingredient) => sum + ingredient.amount,
            0
        );
        this.setState({isPurchasable: count > 0})
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    cancelHandler = () => {
        this.setState({purchasing: false});
    };

    successHandler = () => {
        alert('You decided to continue!');
        this.cancelHandler();
    };

    updateTotalState = (ingredients) => {
        const total = this.getTotal(ingredients);
        this.setState({total: total});
    };

    getTotal = (ingredients) => {
        // подсчёт общей суммы в цикле
        // let total = BREAD_PRICE;
        // for(let i = 0; i < this.state.ingredients.length; i++) {
        //     total += this.state.ingredients[i].total;
        // }
        // return total;

        // аналогичный подсчёт с помощью функции массива reduce:
        return ingredients.reduce(
            (total, ingredient) => total + ingredient.total,
            BREAD_PRICE
        );
    };

    render() {
        return (
            <div className="App">
                {/* вывод компонентов {Ingredient} и {IngredientControl} */}
                {/* через props.children компонентов {Burger} и {BurgerForm} соответственно. */}
                {/* это позволяет не передавать state через props (список ингредиентов), */}
                {/* и т.о. упрощает логику компонентов {Burger} и {BurgerForm}. */}
                <Burger>
                    {this.state.ingredients.map(item => <Ingredient ingredient={item} key={item.name}/>)}
                </Burger>
                <BurgerForm total={this.state.total}>
                    {this.state.ingredients.map(item => <IngredientControl ingredient={item} key={item.name}
                                                                           changeIngredient={this.changeIngredient}/>)}
                </BurgerForm>
                <Order>
                    <OrderButton disabled={!this.state.isPurchasable} click={this.purchaseHandler}/>
                    <Modal show={this.state.purchasing} cancel={this.cancelHandler}>
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            price={this.state.total}
                            purchaseContinue={this.successHandler}
                            purchaseCancel={this.cancelHandler}
                        />
                    </Modal>
                </Order>
            </div>
        );
    }
}

export default App;

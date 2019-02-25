import React, {Component} from 'react';
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";


class Checkout extends Component {
    state = {
        ingredients: []
    };

    componentDidMount() {
        // Создаём объект URLSearchParams из строки запроса.
        // При создании этот объект декодирует и распасит строку,
        // благодаря чему можно будет обращаться к отдельным параметрам запроса.
        const query = new URLSearchParams(this.props.location.search);

        // Далее из этого объекта можно получить список параметров запроса (query.entries()),
        // каждый из которых представляет собой пару [ключ, значение] (переменная param).
        const ingredients = [];
        for (let param of query.entries()) {
            ingredients[param[0]] = JSON.parse(param[1]);
        }
        this.setState({ingredients: ingredients});
    }

    checkoutCancelledHandler = () => {
        // возврат назад, на преыдущую "страницу".
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        // замена текущего пути в истории на новый.
        // текущий путь при этом не сохраняется в истории, поэтому
        // возврат назад будет вести на ту же "страницу", что и до замены.
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return <div>
            <CheckoutSummary
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
            />

            {/* пример "вложенного" Route - когда Route находится не в роутере, */}
            {/* а в другом контейнере, который находится в одном из роутов роутера. */}
            {/* match - это свойство, передаваемое из роутера, которое содержит путь целиком */}
            {/* и его отдельные части, которые совпали с path открытой страницы. */}
            <Route
                path={this.props.match.path + '/contact-data'}
                render={(props) => (<ContactData ingredients={this.state.ingredients}/>)}
            />
        </div>;
    }
}

export default Checkout;

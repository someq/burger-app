import React, {Component} from 'react';
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";


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

    render() {
        return <div>
            <CheckoutSummary
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
            />
        </div>;
    }
}

export default Checkout;

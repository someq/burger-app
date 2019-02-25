import React, {Component} from 'react';
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";


class Checkout extends Component {
  state = {
    ingredients: [
        {name: 'cheese', price: 20, label: 'Сыр', className: 'Cheese', order: 30, amount: 2, total: 40},
        {name: 'meat', price: 35, label: 'Мясо', className: 'Meat', order: 50, amount: 1, total: 35},
    ]
  };

  render() {
    return <CheckoutSummary ingredients={this.state.ingredients} />;
  }
}

export default Checkout;

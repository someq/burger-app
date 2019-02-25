import React, {Component} from 'react';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch, BrowserRouter } from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/" exact component={BurgerBuilder}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}


export default App;

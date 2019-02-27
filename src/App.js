import React, {Component} from 'react';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import AboutUs from "./containers/AboutUs/AboutUs";
import Layout from "./Layout";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                {/* Почему Layout внутри роутера? */}
                {/* Потому что Layout использует компоненты NavLink, */}
                {/* которые зависят от Router и должны быть внутри него. */}
                <Layout>
                    <Switch>
                        <Route path="/about" component={AboutUs}/>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/" exact component={BurgerBuilder}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}


export default App;

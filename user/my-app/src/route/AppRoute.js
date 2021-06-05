import React, {Component,Fragment} from 'react';
import {Route, Switch} from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ContactPage from "../pages/ContactPage";
import PurchasePage from "../pages/PurchasePage";
import PolicyPage from "../pages/PolicyPage";
import RefundPage from "../pages/RefundPage";
import AboutPage from "../pages/AboutPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import FavouritePage from "../pages/FavouritePage";
import CartPage from "../pages/CartPage";
import OrderListPage from "../pages/OrderListPage";
import ProductListByCategory from "../pages/ProductListByCategory";
import ProductListBySubCategory from "../pages/ProductListBySubCategory";
import SearchPage from "../pages/SearchPage";


class AppRoute extends Component {
    render() {
        return (
            <Fragment>

                <Switch>
                    <Route exact path="/" render={(props) => <HomePage {...props} key={Date.now()}/>}/>
                    <Route exact path="/LoginPage" render={(props) => <LoginPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/RegistrationPage" render={(props) => <RegistrationPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/contact" render={(props) => <ContactPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/about" render={(props) => <AboutPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/purchase" render={(props) => <PurchasePage {...props} key={Date.now()}/>}/>
                    <Route exact path="/policy" render={(props) => <PolicyPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/refund" render={(props) => <RefundPage {...props} key={Date.now()}/>}/>

                    <Route exact path="/ProductByCategory/:category_id/:CategoryName" render={(props) => <ProductListByCategory {...props} key={Date.now()}/>}/>
                    <Route exact path="/ProductBySubCategory/:category_id/:subcategory_id/:subcat_name" render={(props) => <ProductListBySubCategory {...props} key={Date.now()}/>}/>
                    <Route exact path="/productDetails/:product_code" render={(props) => <ProductDetailsPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/ProductBySearch/:search_key" render={(props) => <SearchPage {...props} key={Date.now()}/>}/>


                    <Route exact path="/cart" render={(props) => <CartPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/favourite" render={(props) => <FavouritePage {...props} key={Date.now()}/>}/>
                    <Route exact path="/orderlist" render={(props) => <OrderListPage {...props} key={Date.now()}/>}/>


                   
                </Switch>

            </Fragment>
        );
    }
}

export default AppRoute;
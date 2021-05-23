import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import CartPage from "./pages/CartPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import SignUpPage from "./pages/SignUpPage";

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/product" component={AddProduct} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/*" render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
}

export default Routes;

import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddProduct from './admin/AddProduct';

const Routes = () => {
    return (
        <BrowserRouter>
        <Menu/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                <AdminRoute path="/user/admindashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/create/product" exact component={AddProduct}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
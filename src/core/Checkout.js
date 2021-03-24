import React, { useState, useEffect } from 'react';
import { getProducts } from "./apiCore";
import Card from "./Card";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

const Checkout = ({ products }) => {

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <Link to="/app">
                <button className="btn btn-success">Checkout</button>
            </Link> 
    ) : (
        <Link to="/signin">
            <button className="btn btn-primary">
                Sign in toCheckout
            </button>
        </Link>
    )};

   

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>

            {showCheckout()}
            
        </div>
    );
};

export default Checkout;
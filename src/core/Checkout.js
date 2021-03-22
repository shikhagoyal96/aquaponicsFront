import React, { useState, useEffect } from 'react';
import { getProducts, getBraintreeClientToken } from "./apiCore";
import Card from "./Card";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import 'braintree-web';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products }) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ ...data, clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Checkout</button>
    ) : (
        <Link to="/signin">
            <button className="btn btn-primary">
                Sign in toCheckout
            </button>
        </Link>
    )};

    const showDropIn = () => (
        <div 
       // onBlur={() => setData({ ...data, error: '' })}
        >
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    {/* <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div> */}

                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            // paypal: {
                            //     flow: 'vault'
                            // }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button className="btn btn-success">
                        Checkout
                    </button>
                </div>
            ) : null}
        </div>
    );

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>

            {showCheckout()}
            
        </div>
    );
};

export default Checkout;
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
//import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51IYGBwIx5BRwup8Py5Wpm9nHbwU5hG7m8ksHOvM4XOcZ8suz4O8pBnAFi5GpMA1TWGiZH5fVcbqujBuRmyZSlg3400GY5dLKxE");

export default function App() {
  return (
    <div className="App">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}


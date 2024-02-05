import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { REACT_APP_PUBLISHABLE_KEY } from "./config";

const stripePromise = loadStripe(REACT_APP_PUBLISHABLE_KEY)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Elements stripe={stripePromise}>
               <App />
          </Elements>
      </BrowserRouter>
  </React.StrictMode>
);


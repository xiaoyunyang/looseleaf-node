import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import App from '../shared/Guest/App';
import '../lib/tabs';
import '../lib/chips';
import '../assets/index.css';
import 'draft-js/dist/Draft.css';

console.log('Browser packed file loaded');

// Grab the server serialized state off of the window object.
const initialState = window.__INITIAL_STATE;
// const initialStateRoute = window.__SERIALIZED_STATE__;

// console.log('initialStateRoute', initialStateRoute)

// Instead of starting Redux with an empty initial state on the server,
// you pass the server data into the Redux setup.
// const storeRoute = initRedux(initialStateRoute);

console.log('Data to hydrate with', initialState);

/*
 * Main entry point for the client side isomorphic app
 */
const renderRouter = (Component, store) => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <Component />
    </BrowserRouter>, document.getElementById('root')
  );
};

// Wrapping App inside of Provider
// render(RecipeApp, store);
renderRouter(App);

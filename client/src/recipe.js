import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './shared/Recipe/App';
import initRedux from './redux/Recipe/init-redux';
// require('./style.css');

console.log('Browser packed file loaded');

// Grab the server serialized state off of the window object.
const initialState = window.__INITIAL_STATE;

// console.log('initialStateRoute', initialStateRoute)

// Instead of starting Redux with an empty initial state on the server,
// you pass the server data into the Redux setup.
const store = initRedux(initialState);
// const storeRoute = initRedux(initialStateRoute);

console.log('Data to hydrate with', initialState);

/*
 * Main entry point for the client side isomorphic app
 */
const render = (Component, store) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
};

// Wrapping App inside of Provider
// render(RecipeApp, store);
render(App, store);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RecipeApp from './components/Recipe/app';
import initRedux from './redux/init-redux.es6';
import App from '../shared/App'
// require('./style.css');

console.log('Browser packed file loaded');

// Grab the server serialized state off of the window object.
const initialState = window.__INITIAL_STATE;
// const initialStateRoute = window.__SERIALIZED_STATE__;

// console.log('initialStateRoute', initialStateRoute)

// Instead of starting Redux with an empty initial state on the server,
// you pass the server data into the Redux setup.
const store = initRedux(initialState);
// const storeRoute = initRedux(initialStateRoute);

console.log('Data to hydrate with', initialState);

/*
 * Main entry point for the client app
 */
const render = (Component, store) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
};

const renderRouter = (Component, store) => {
  ReactDOM.render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>, document.getElementById('root'));
};

// Wrapping App inside of Provider
// render(RecipeApp, store);
renderRouter(App, store);

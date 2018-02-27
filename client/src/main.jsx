import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/Recipe/app';
import initRedux from './redux/init-redux.es6';
// require('./style.css');

console.log("Browser packed file loaded");

const initialState = window.__INITIAL_STATE;
const store = initRedux(initialState);

console.log('Data to hydrate with', initialState);

/*
 * Main entry point for the client app
 */
const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
};

//Wrapping App inside of Provider
render(App);

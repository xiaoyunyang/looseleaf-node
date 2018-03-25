import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './lib/tabs' // <- overriding the materialize tabs js
import AppOld from './App';
import AppUser from './AppUser';
import AppGuest from './AppGuest';
import AppRecipe from './AppRecipe';
import './assets/index.css';

/*
 * Main entry point for the create-react-app
 */
const isLoggedin = true;
const App = isLoggedin ? AppUser : AppGuest;
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

// Wrapping App inside of AppContainer, which is a react-hot-loader component
render(App);


// Webpack Hot Module Replacement API
if (module.hot) {
  console.log('module is hot');
  module.hot.accept('./App', () => {
    render(App);
  });
}

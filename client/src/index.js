import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css';
import './assets/index.css';

/*
 * Main entry point for the client app
 */
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

//Wrapping App inside of AppContainer, which is a react-hot-loader component
render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}

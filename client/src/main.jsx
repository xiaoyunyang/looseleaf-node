import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './components/Recipe/app';
import initRedux from './redux/init-redux.es6';
// require('./style.css');

// console.log("Browser packed file loaded");

const initialState = window.__INITIAL_STATE;
const store = initRedux(initialState);

// console.log('Data to hydrate with', initialState);


const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}><App /></Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

console.log("module is not hot!!!")
render(App)


// Webpack Hot Module Replacement API
if (module.hot) {
  console.log("module is hot!!!")
  module.hot.accept('./App', () => {
    render(App)
  })
}

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './shared/User/App';
import { hot } from 'react-hot-loader';
import configureStore from './shared/redux/User/configureStore';

const store = configureStore();

console.log('store.getState() =', store.getState())

const AppUser = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default hot(module)(AppUser);

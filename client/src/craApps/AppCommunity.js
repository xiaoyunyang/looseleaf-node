import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/Community/App';
import { hot } from 'react-hot-loader';
import configureStore from '../shared/redux/Community/configureStore';

const store = configureStore();
const AppCommunity = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default hot(module)(AppCommunity);

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/ProjectPage/App';
import { hot } from 'react-hot-loader';

import configureStore from '../shared/redux/Project/configureStoreCRA';

const store = configureStore();

const AppProjectPage = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default hot(module)(AppProjectPage);

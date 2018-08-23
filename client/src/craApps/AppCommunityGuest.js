import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/CommunityGuest/App';
import { hot } from 'react-hot-loader';
import initStore from '../shared/redux/configureStore/initCommunityGuestPage';

const store = initStore();

const AppCommunity = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default hot(module)(AppCommunity);

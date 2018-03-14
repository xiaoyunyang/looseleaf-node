import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './shared/User/App';
import { hot } from 'react-hot-loader';

const AppUser = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default hot(module)(AppUser);

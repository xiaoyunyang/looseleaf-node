import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/Community/App';
import { hot } from 'react-hot-loader';

const AppCommunity = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default hot(module)(AppCommunity);

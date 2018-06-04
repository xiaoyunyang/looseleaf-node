import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/Guest/App';
import { hot } from 'react-hot-loader';

const AppGuest = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default hot(module)(AppGuest);

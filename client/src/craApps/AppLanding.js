import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import App from '../shared/Landing/App';

const AppLanding = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default hot(module)(AppLanding);

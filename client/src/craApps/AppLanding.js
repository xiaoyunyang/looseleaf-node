import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/Landing/App';
import { hot } from 'react-hot-loader';

const AppLanding = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default hot(module)(AppLanding);

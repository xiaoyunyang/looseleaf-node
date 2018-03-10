import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Tabs from './Tabs';

const root = '/profile';

export default () => (
  <div>
    <div className="ui main text container">
      <h1>About Page</h1>
        <BrowserRouter>
          <Tabs/>
        </BrowserRouter>

    </div>
  </div>
);

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import Tabs from './Tabs';

const root = '/profile/about';


export default () => (
  <div className="ui main text container">
    <h1>About Page</h1>
  </div>
);

/*
export default () => (
  <div>
    <div className="ui main text container">
      <h1>About Page</h1>
        <BrowserRouter>
          <Tabs root={root}/>
        </BrowserRouter>
    </div>
  </div>
);
*/

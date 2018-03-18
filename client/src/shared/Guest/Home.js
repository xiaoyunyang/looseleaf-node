import React from 'react';
import fetch from 'isomorphic-fetch';
import TopNav from './TopNav';

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container">
      <div>
        <h1>Home</h1>
        <p>Welcome!</p>
      </div>
    </div>
  </div>
);

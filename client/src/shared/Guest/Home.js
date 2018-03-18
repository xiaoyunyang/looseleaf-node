import React from 'react';
import TopNav from './TopNav';

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container main">
      <div>
        <h1>Home</h1>
        <p>Welcome!</p>
      </div>
    </div>
  </div>
);

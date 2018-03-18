import React from 'react';
import TopNav from './TopNav';

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container">
      <div>
        <h1>How It Works</h1>
        <p>Use LooseLeaf</p>
      </div>
    </div>
  </div>
);

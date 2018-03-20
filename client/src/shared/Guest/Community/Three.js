import React from 'react';
import TopNav from '../TopNav';

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container main">
      <div id="three" className="col s12">
        <h2>Writers</h2>
      </div>
    </div>
  </div>
);

import React from 'react';
import TopNav from '../TopNav';

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container main">
      <div id="two" className="col s12">
        <h2>Two</h2>
      </div>
    </div>
  </div>
);

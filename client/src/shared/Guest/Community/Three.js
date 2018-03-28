import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container main">
      <div id="three" className="col s12">
        <h2>Aspiring Writers</h2>
        <UserListing number={2} />
      </div>
    </div>
  </div>
);

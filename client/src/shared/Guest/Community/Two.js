import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container main">
      <div id="two" className="col s12">
        <h2>Aspiring Designers</h2>
        <UserListing number={5} />
      </div>
    </div>
  </div>
);

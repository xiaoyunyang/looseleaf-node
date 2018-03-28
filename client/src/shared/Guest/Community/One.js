import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing'

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container main">
      <div id="one" className="col s12">
        <h4>Aspiring Developers</h4>
        <UserListing number={15} />
      </div>
    </div>
  </div>
);

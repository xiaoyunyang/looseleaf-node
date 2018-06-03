import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
import { communities } from '../routes';

export default ( {route} ) => (
  <div>
    <TopNav route={route} extended={true} />
    <div className="container main">
      <div id={communities.three} className="col s12">
        <h3>Aspiring Writers</h3>
        <UserListing number={2} />
      </div>
    </div>
  </div>
);

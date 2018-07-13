import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
import { tabs } from '../routes';

export default ( {route, user, community} ) => (
  <div>
    <TopNav route={route} user={user} community={community} />
    <div className="container main">
      <div id={tabs.three} className="col s12">
        <h3>People</h3>
      </div>
    </div>
  </div>
);

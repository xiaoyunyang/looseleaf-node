import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
import { tabs } from '../routes';

export default ( {route, user, community } ) => (
  <div>
    <TopNav route={route} community={community} />
    <div className="container main">
      <div id={tabs.one} className="col s12">
        <h3>Projects</h3>
      </div>
    </div>
  </div>
);

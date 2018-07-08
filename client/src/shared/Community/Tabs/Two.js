import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
import { tabs } from '../routes';

export default ( {route, community} ) => (
  <div>
    <TopNav route={route} community={community} extended={true}/>
    <div className="container main">
      <div id={tabs.two} className="col s12">
        <h3>Announcements</h3>
      </div>
    </div>
  </div>
);

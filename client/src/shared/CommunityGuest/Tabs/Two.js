import React from 'react';
import TopNav from '../TopNav';
import { tabs } from '../routes';

export default ({ route, community }) => (
  <div>
    <TopNav route={route} community={community} />
    <div className="container main">
      <div id={tabs.two} className="col s12">
        <h3>Announcements</h3>
      </div>
    </div>
  </div>
);
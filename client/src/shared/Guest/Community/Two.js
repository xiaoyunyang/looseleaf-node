import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
import { communities } from '../routes';

export default ( {route} ) => (
  <div>
    <TopNav route={route} extended={true}/>
    <div className="container main">
      <div id={communities.two} className="col s12">
        <h2>Aspiring Designers</h2>
        <UserListing number={5} />
      </div>
    </div>
  </div>
);

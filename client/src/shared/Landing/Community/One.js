import React from 'react';
import TopNav from '../../components/TopNavGuest';
import UserListing from './UserListing';
import { communities } from '../routes';

export default ( {route} ) => (
  <div>
    <TopNav route={route} extended={true}/>
    <div className="container main">
      <div id={communities.one} className="col s12">
        <h3>Aspiring Developers</h3>
        <UserListing number={15} />
      </div>
    </div>
  </div>
);

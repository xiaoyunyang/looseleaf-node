import React from 'react';
import Main from './Main';

const Root = ({ route, user, community }) => (
  <div>
    {
      console.log('Root', community)
    }
    <Main routes={route.routes} user={user} community={community} />
  </div>
)

export default Root;

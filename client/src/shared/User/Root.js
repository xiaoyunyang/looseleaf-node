import React from 'react';
import Main from './Main';

const Root = ({ route, user }) => (
  <Main routes={route.routes} user={user} />
);

export default Root;

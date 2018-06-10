import React from 'react';
import Main from './Main';

const Root = ({ route, user, project }) => (
  <Main routes={route.routes} user={user} project={project} />
);

export default Root;

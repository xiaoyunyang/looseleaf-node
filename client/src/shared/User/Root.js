import React from 'react';
import Main from './Main';

const Root = ({ route, state, actions }) => (
  <Main routes={route.routes} user={state.user} actions={actions} />
);

export default Root;

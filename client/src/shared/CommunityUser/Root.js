import React from 'react';
import Main from './Main';

const Root = ({ route, state, actions }) => (
  <Main routes={route.routes} state={state} actions={actions} />
);

export default Root;

import React from 'react';
import Main from './Main';

const Root = ({ route, state, actions }) => (
  <div>
    <Main routes={route.routes} state={state} actions={actions} />
  </div>
);

export default Root;

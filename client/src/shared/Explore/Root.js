import React from 'react';
import Main from './Main';

const Root = ({ route, state }) => (
  <Main
    routes={route.routes}
    state={state}
  />
);

export default Root;

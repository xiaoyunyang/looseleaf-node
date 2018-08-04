import React from 'react';
import Main from './Main';

const Root = ({ route }) => (
  <div>
    <Main routes={route.routes} />
  </div>
);
export default Root;

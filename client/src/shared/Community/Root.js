import React from 'react';
import Main from './Main';
import Footer from '../components/Footer';

const Root = ({ route, community }) => (
  <div>
    <Main routes={route.routes} community={community} />
  </div>


)

export default Root;

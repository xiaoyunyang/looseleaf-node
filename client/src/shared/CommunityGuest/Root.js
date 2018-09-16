import React from 'react';
import Main from './Main';
import Footer from '../components/Footer';

const Root = ({ route, user, community }) => (
  <div>
    <Main routes={route.routes} user={user} community={community} />
    <Footer />
  </div>
)

export default Root;

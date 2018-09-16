import React from 'react';
import Main from './Main';
import Footer from '../components/Footer';

const Root = ({ route, state, actions }) => (
  <div>
    <Main routes={route.routes} state={state} actions={actions} />
    <Footer />
  </div>
);

export default Root;

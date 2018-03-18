import React from 'react';
import Main from './Main';
import Footer from '../components/Footer';

const Root = ({ route }) => (
  <div>
    <Main routes={route.routes} />
    <Footer />
  </div>


)

export default Root;

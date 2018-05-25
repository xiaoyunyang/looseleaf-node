import React from 'react';
import TopNav from './TopNav';
import MdText from '../components/MdText';

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container main">
      <div>
        <MdText filepath='http://localhost:3001/how-it-works.md' mdId='how-it-works'/>
      </div>
    </div>
  </div>
);

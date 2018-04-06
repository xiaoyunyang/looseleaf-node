import React from 'react';
import TopNav from './TopNav';

export default ( {route} ) => (
  <div>
    <TopNav route={route} extended={true}/>
    <div className="container main">
      <div>
        <h1>Mission</h1>
        <p>Welcome!</p>
        <h3>Access to work opportunities does not need to be blocked by unaffordable college education.</h3>
        <h5>Work opportunities create learning opportunities.</h5>
        <h3>Future of Work is peer-to-peer, distributed, and modular.</h3>
      </div>
    </div>
  </div>
);

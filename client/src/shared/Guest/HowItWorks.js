import React from 'react';
import TopNav from './TopNav';

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container main">
      <div>
        <h1>How It Works</h1>
        <h3>How we provide value</h3>
        <h4>For non-profits:</h4>
        <p>{'Let aspiring web developers help you build a website for your non-profit.'}</p>
          <h4>For Employers:</h4>
          <p>{'Grittiness is an indicator of success. Find Gritty prospective employers here.'}</p>
        <p>{'.'}</p>
      </div>
    </div>
  </div>
);

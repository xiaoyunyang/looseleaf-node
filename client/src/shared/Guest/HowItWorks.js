import React from 'react';
import TopNav from './TopNav';
import MdText from '../components/MdText';

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container main">
      <div>
        <h5>Markdown Stuff: </h5>
        <MdText filepath='http://localhost:3001/how-it-works.md' mdId='how-it-works'/>
        <h5>Non-Markdown Stuff: </h5>
        <h3>How It Works</h3>
        <h3>How we provide value for</h3>

        <h4>Non-profits:</h4>
        <p>
          LooseLeaf helps nonprofits find volunteers to work on app development,
        </p>
        <p>{'Let aspiring web developers help you build a website for your non-profit.'}</p>
          <h4>For Employers:</h4>
          <p>{'Grittiness is an indicator of success. Find Gritty prospective employers here.'}</p>
        <p>{'.'}</p>
      </div>
    </div>
  </div>
);

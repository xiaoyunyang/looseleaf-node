import React from 'react';
import { Link } from 'react-router-dom';

const root = '/profile';

export default () => (
  <nav>
    <div className="nav-wrapper">
      <a href={root} className="brand-logo">LooseLeaf</a>
      <ul id="nav-mobile" className="right">
        <li><Link to={root}>Home</Link></li>
        <li><Link to={`${root}/about`}>About</Link></li>
        <li><Link to={`${root}/foo`}>Foo</Link></li>
      </ul>
    </div>
  </nav>
);

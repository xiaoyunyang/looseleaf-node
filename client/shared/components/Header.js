import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <nav>
    <div className="nav-wrapper">
      <a href="/iso-router/" className="brand-logo">All Things Westies</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/iso-router/">Home</Link></li>
          <li><Link to="/iso-router/about">About</Link></li>
          <li><Link to="/iso-router/foo">Foo</Link></li>
        </ul>
    </div>
  </nav>
);

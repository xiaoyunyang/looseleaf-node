import React from 'react';
import { Link } from 'react-router-dom';

const root = '/profile';

export default () => (
  <div className="navbar-fixed">
    <nav className="grey lighten-4">
      <div className="nav-wrapper-white nav-text-links">
        <ul id="nav-mobile" className="right">
          <li><Link to={root}>Home</Link></li>
          <li><Link to={`${root}/about`}>About</Link></li>
          <li><Link to={`${root}/foo`}>Foo</Link></li>
          <li>
            <a href="#" className="navbar-img dropdown-button" data-activates="user-dropdown">
              <img alt='loosleaf' className="mod-round" src="http://looseleafapp.com/assets/data/profile/photo/looseleaf.png" />
              <div className="arrow-down" />
            </a>
            <ul id="user-dropdown" className="dropdown-content">
              <li><a href="/user">Profile</a></li>
              <li><a href="/user">Stats</a></li>
              <li className="divider" />
              <li><a href="/logout">Log out</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

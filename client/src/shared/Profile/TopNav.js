import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const root = '/profile';
const username = 'xiaoyun-yang';

export default class TopNav extends React.Component {
  componentDidMount() {
    $(".button-collapse").sideNav({
      edge: 'left',
      closeOnClick: true
    });
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="grey lighten-4">
          <div className="nav-wrapper-white nav-text-links">
            <div className="brand-logo">
              <Link className="navbar-brand" to={root}>
                <img src="http://looseleafapp.com/assets/images/logo/logo.png" alt="LooseLeaf" />
              </Link>
            </div>
            <ul className="right hide-on-med-and-down">
              <li><Link to={root} className="active">Home</Link></li>
              <li><Link to={`${root}/user/${username}`}>Profile</Link></li>
              <li><Link to={`${root}/foo`}>Foo</Link></li>
              <li><button><i className="material-icons">notifications_none</i></button></li>
              <li>
                <a href="#" className="navbar-img dropdown-button" data-activates="user-dropdown">
                  <img alt='loosleaf' className="mod-round" src="http://looseleafapp.com/assets/data/profile/photo/looseleaf.png" />
                  <div className="arrow-down" />
                </a>
                <ul id="user-dropdown" className="dropdown-content">
                  <li><Link to={`${root}/user/${username}`}>Profile</Link></li>
                  <li><a href="/user">Stats</a></li>
                  <li className="divider" />
                  <li><a href="/logout">Log out</a></li>
                </ul>
              </li>
            </ul>
            <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="side-nav" id="mobile-menu">
              <li><Link to={root} className="active">Home</Link></li>
              <li><Link to={`${root}/user/${username}`}>Profile</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }

}

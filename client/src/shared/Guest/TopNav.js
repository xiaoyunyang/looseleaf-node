import React from 'react';
import { Link } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import $ from 'jquery';
import routes from './routes';

const root = 'public';

class MobileSideNav extends React.Component {
  componentDidMount() {
    $('.button-collapse').sideNav({
      edge: 'left',
      closeOnClick: true
    });
  }
  render() {
    return (
      <div>
        <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
        <ul className="side-nav" id="mobile-menu">
          <li><Link to={`/${root}`} className="active">Home</Link></li>
          <li><Link to={`/${root}/how-it-works`}>How It Works</Link></li>
          <li><a href="">Login</a></li>
        </ul>
      </div>
    );
  }
}

export default class TopNav extends React.Component {
  render() {
    // TODO: active nav from server and client disagree. server
    // rendered page does not know what the route is. Why?
    let selected = '';
    if (typeof document !== 'undefined') {
      selected = document.location.pathname.split('/').pop();
      $(`#nav-${selected}`).trigger('click');
    }
    return (
      <div className="navbar-fixed">
        <nav className="grey lighten-4">
          <div className="nav-wrapper-white nav-text-links">
            <div className="brand-logo">
              <Link className="navbar-brand" to={`/${root}`}>
                <img src="http://looseleafapp.com/assets/images/logo/logo.png" alt="LooseLeaf" />
              </Link>
            </div>
            <ul className="right hide-on-med-and-down">
              <li className={selected === root ? 'active' : ''}>
                <Link id={`nav-${root}`} to={`/${root}`}>Home</Link>
              </li>
              <li className={selected === 'how-it-works' ? 'active' : ''}>
                <Link id="nav-how-it-works" to={`/${root}/how-it-works`}>How It Works</Link>
              </li>
              <li><a href="">Login</a></li>
              <li><a href="">Join</a></li>
            </ul>
            <MobileSideNav />
          </div>
        </nav>
      </div>
    );
  }
}

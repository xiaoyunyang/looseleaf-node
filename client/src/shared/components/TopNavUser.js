import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { root } from '../User/routes';
import { getPageName } from '../../lib/helpers';
import { staticApiLink } from '../data/apiLinks';
import { image } from '../data/assetLinks';
import appRoute from '../data/appRoute';

// const username = store.username;

const MobileSideNav = ( {username, userPic} ) => (
  <ul id="mobile-menu" className="side-nav">
    <li>
      <div className="user-view">
        <img alt={`looseleaf user ${username}`} className="circle" src={userPic} />
        <div className="row">
          <div className="col l2 m2 s2">
            <a href="https://github.com/xiaoyunyang"><i className="fa fa-github fa-lg" /></a>
          </div>
          <div className="col l2 m2 s2">
            <a href="https://www.linkedin.com/in/xiaoyun-yang"><i className="fa fa-linkedin fa-lg" /></a>
          </div>
          <div className="col l2 m2 s2">
            <a href="https://medium.com/@xiaoyunyang"><i className="fa fa-medium fa-lg" /></a>
          </div>
          <div className="col l2 m2 s2">
            <a href="mailto:xiaoyun@looseleafapp.com"><i className="fa fa-envelope fa-lg" /></a>
          </div>
        </div>
      </div>
    </li>
    <li><Link to={appRoute('userHome')} className="active">Home</Link></li>
    <li><Link to={appRoute('userPortfolio')(username)}>Portfolio</Link></li>
  </ul>
);

const UserDropdown = ({ username, userPic }) => (
  <li id="dropdown-block">
    <a className="navbar-img dropdown-button" data-activates="user-dropdown">
      <img alt={`looseleaf user ${username}`} className="mod-round" src={userPic} />
      <div className="arrow-down" />
    </a>
    <ul id="user-dropdown" className="dropdown-content">
      <li><Link to={appRoute('userPortfolio')(username)}>Portfolio</Link></li>
      <li><a href={appRoute('newProject')}>New Project</a></li>
      <li className="divider" />
      <li><a href="/">WebDev</a></li>
      <li><Link to={appRoute('userSettings')(username)}>Settings</Link></li>
      <li><a href={staticApiLink.logout}>Log out</a></li>
    </ul>
  </li>
);

// Callers:  User/Home.js and User/Porfolio/Main.js and User/Settings/Main.js
export default class TopNavUser extends React.Component {
  static defaultProps = {
    useExternLinks: false
  }
  componentDidMount() {
    $('.button-collapse').sideNav({
      edge: 'right',
      closeOnClick: true
    });
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
    if (typeof window !== 'undefined') {
      $(window).scroll(() => {
        this.toggleNavbarBoxShadow();
      });
    }
  }
  // TODO: I don't know if there's a more elegant way to do this in css
  // This function is essentially doing the same thing as the one in the topNav
  // component of the Guest App. Can we create a template for it somehow?
  toggleNavbarBoxShadow() {
    const boxShadow = "0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)";
    const topNav = $("#user-navbar-fixed .navbar-fixed nav");
    const tabs = $('.tabs-container');
    if (tabs.hasClass('pinned')) {
      topNav.css('box-shadow', 'none');
    } else if (tabs.hasClass('pin-top')) {
      topNav.css('box-shadow', boxShadow);
    }
  }
  render() {
    const username = this.props.user.username;
    const userPic = this.props.user.picture;
    const selected = (typeof this.props.route.path === 'string')
      ? getPageName(this.props.route.path) : '';

    // TODO: Still need the code below?
/*
    if (typeof document !== 'undefined') {
        selected = document.location.pathname.split('/').pop();
        console.log('client rendered...selected=', selected)
        $(`#nav-${selected}`).trigger('click');
    }
*/
    return (
      <div id="user-navbar-fixed">
        <div className="navbar-fixed">
          <nav className="grey lighten-4">
            <div className="nav-wrapper-white nav-text-links">
              <div className="brand-logo hide-on-med-and-down">
                <Link className="navbar-brand" to={appRoute('landingHome')}>
                  <img src={image.logo} alt="LooseLeaf" />
                </Link>
              </div>
              <ul className="right hide-on-small-only">
                <li className={selected === root ? 'active' : ''}>
                  {
                    this.props.useExternLinks ?
                      <a href={appRoute('userHome')}>Home</a>
                      :
                      <Link id={`nav-${root}`} to={appRoute('userHome')}>Home</Link>
                  }
                </li>
                <li className={selected === 'project' ? 'active' : ''}>
                  <a href={appRoute('project')}>Project</a>
                </li>
                <li className={selected === username ? 'active' : ''}>
                  {
                    this.props.useExternLinks ?
                    <a href={appRoute('userPortfolio')(username)}>Portfolio</a>
                    :
                    <Link id={`nav-${username}`} to={appRoute('userPortfolio')(username)}>Portfolio</Link>
                  }
                </li>
                <li><button><i className="material-icons">notifications_none</i></button></li>
                <UserDropdown username={username} userPic={userPic} />
              </ul>
              <ul className="right hide-on-med-and-up">
                <li>
                  <a data-activates="mobile-menu" className="button-collapse"><i id="top-nav-hamburger" className="material-icons large">menu</i></a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <MobileSideNav username={username} userPic={userPic} />
      </div>

    );
  }
}
TopNavUser.proTypes = {
  useExternLinks: PropTypes.bool
};

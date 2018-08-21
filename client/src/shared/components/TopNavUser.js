import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { getPageName } from '../../lib/helpers';
import { apiLink } from '../data/apiLinks';
import { image } from '../data/assetLinks';
import appRoute from '../data/appRoute';

// const username = store.username;

const NavLink = ({external, to, className, id, name}) => (
  external ?
    <a id={id} className={className} href={to}>{name}</a>
    :
    <Link d={id} className={className} to={to}>{name}</Link>
);

const MobileSideNav = ( {username, userPic, userWebsite, userEmail, useExternLinks} ) => (
  <ul id="mobile-menu" className="side-nav">
    <li>
      <div className="user-view">
        <img alt={`looseleaf user ${username}`} className="circle" src={userPic} />
        <div className="row">
          <div className="col l2 m2 s2">
            <a href={`mailto:${userEmail}`}><i className="fa fa-envelope fa-lg" /></a>
          </div>
          {
            userWebsite &&
            <div className="col l2 m2 s2">
              <a target="_blank" href={userWebsite} rel="noopener noreferrer">
                <i className="fa fa-globe-americas fa-lg" />
              </a>
            </div>
          }
        </div>
      </div>
    </li>
    <li>
      <NavLink to={appRoute('userHome')} name='Home' external={useExternLinks}/>
    </li>
    <li>
      <NavLink to={appRoute('userProfile')(username)} name='Profile' external={useExternLinks}/>
    </li>
    <li>
      <NavLink to={appRoute('newProject')} name='New Project' external={useExternLinks}/>
    </li>
    <li className="divider" />
    <li>
      <NavLink to={appRoute('userSettings')(username)} name='Settings' external={useExternLinks}/>
    </li>
    <li>
      <NavLink to={apiLink.logout} name='Log out' external={true}/>
    </li>
  </ul>
);

const UserDropdown = ({ username, userPic, useExternLinks }) => (
  <li id="dropdown-block">
    <a className="navbar-img dropdown-button" data-activates="user-dropdown">
      <img alt={`looseleaf user ${username}`} className="mod-round" src={userPic} />
      {
        // <div className="arrow-down" />
      }

    </a>
    <ul id="user-dropdown" className="dropdown-content topnav-dropdown">
      <li>
        <NavLink to={appRoute('userProfile')(username)} name='Profile' external={useExternLinks}/>
      </li>
      <li>
        <NavLink to={appRoute('newProject')} name='New Project' external={useExternLinks}/>
      </li>
      <li className="divider" />
      <li><a href="/community">Communities</a></li>
      <li>
        <NavLink to={appRoute('userSettings')(username)} name='Settings' external={useExternLinks}/>
      </li>
      <li><NavLink to={apiLink.logout} name='Log out' external={true}/></li>
      <div className="popover-arrow"></div>
    </ul>
  </li>
);

const CommunityDropdown = ({ communities }) => (
  <li id="dropdown-block">
    <a className="dropdown-button" data-activates="community-dropdown">
      Communities
    </a>
    <ul id="community-dropdown" className="dropdown-content topnav-dropdown">
      { communities.length === 0 ?
        <li>
          <a href='/community/explore'>Join One</a>
        </li>
        :
        communities.map(d =>  (
            <li key={`community-link-${d.name}`}>
              <a href={d.link}>{d.name}</a>
            </li>
          )
        )
      }
      <div className="popover-arrow"></div>
    </ul>
  </li>
);

const NotifDropdown = ({ notifs }) => (
  <li id="dropdown-block">
    <a className="dropdown-button" data-activates="notif-dropdown">
      <i className="material-icons">notifications_none</i>
    </a>
    <ul id="notif-dropdown" className="dropdown-content topnav-dropdown">
      {
        <li>
          <a href="">Stuff</a>
        </li>
      }
      <div className="popover-arrow"></div>
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
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      constrainWidth: false, // Does not change width of dropdown to that of the activator
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
    const profileUserpic = $('#profile-userpic-tab');
    const navbarLogo = $('#navbar-logo');
    if (tabs.hasClass('pinned')) {
      topNav.css('box-shadow', 'none');
      topNav.css('-webkit-box-shadow', 'none');
      profileUserpic.css('visibility', 'visible');
      navbarLogo.css('visibility', 'hidden');
    } else if (tabs.hasClass('pin-top')) {
      topNav.css('box-shadow', boxShadow);
      topNav.css('-webkit-box-shadow', boxShadow);
      profileUserpic.css('visibility', 'hidden');
      navbarLogo.css('visibility', 'visible');
    }
  }
  render() {
    const username = this.props.user.username;
    const userPic = this.props.user.picture;
    const userWebsite = this.props.user.website;
    const userEmail = this.props.user.email;
    const communities = this.props.user.communities;
    const selected = this.props.route && (typeof this.props.route.path === 'string')
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
              <div className="brand-logo hide-on-small-only">
                {
                  this.props.useExternLinks ?
                    <a id="navbar-logo" className="navbar-brand" href={appRoute('landingHome')}>
                      <img src={image.logo} alt="LooseLeaf" />
                    </a>
                    :
                    <Link id="navbar-logo" className="navbar-brand" to={appRoute('landingHome')}>
                      <img src={image.logo} alt="LooseLeaf" />
                    </Link>
                }
              </div>
              <ul className="right hide-on-small-only">
                <li className={selected === '' ? 'active' : ''}>
                  <NavLink id={`nav-`} to={appRoute('userHome')} name='Home' external={this.props.useExternLinks} />
                </li>
                <CommunityDropdown communities={communities} />
                <li className={selected === username ? 'active' : ''}>
                  <NavLink id={`nav-${username}`} to={appRoute('userProfile')(username)} name='Profile' external={this.props.useExternLinks}/>
                </li>
                <NotifDropdown notifs={'stuff'} />
                <UserDropdown
                  username={username}
                  userPic={userPic}
                  useExternLinks={this.props.useExternLinks}
                />
              </ul>
              <ul className="right hide-on-med-and-up">
                <li>
                  <a data-activates="mobile-menu" className="button-collapse"><i id="top-nav-hamburger" className="material-icons large">menu</i></a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <MobileSideNav
          username={username} userPic={userPic} userWebsite={userWebsite} userEmail={userEmail} useExternLinks={this.props.useExternLinks}
        />
      </div>

    );
  }
}
TopNavUser.proTypes = {
  useExternLinks: PropTypes.bool
};

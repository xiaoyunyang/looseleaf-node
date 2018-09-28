import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { getPageName} from '../../../lib/helpers';
import { image } from '../../data/assetLinks';
import appRoute from '../../data/appRoute';
import { UserAppNav } from '../Nav/AppNav';
import MobileSideNav from './MobileSideNav';
import UserDropdown from './UserDropdown';
import CommunityDropdown from './CommunityDropdown';
import NotifWrapper from '../Collection/Notifs/Wrapper';

// Callers:  User/Home.js and User/Porfolio/Main.js and User/Settings/Main.js
export default class TopNavUser extends React.Component {
  componentDidMount() {
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
    const boxShadow = '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)';
    const topNav = $('#user-navbar-fixed .navbar-fixed nav');
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
    const useExternLinks = this.props.useExternLinks;
    const selected = this.props.route && (typeof this.props.route.path === 'string')
      ? getPageName(this.props.route.path) : 'foo'; // NOTE: The "foo" is so
      // that it'll never match anything. Leaving it empty will cause match to "Home"

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
                  <UserAppNav pageName="home" id="nav-" username={username} external={useExternLinks}/>
                </li>
                <CommunityDropdown communities={communities} />
                <li className={selected === username ? 'active' : ''}>
                  <UserAppNav pageName="profile" id={`nav-${username}`} username={username} external={useExternLinks}/>
                </li>
                <NotifWrapper userId={this.props.user._id} notifs={this.props.notifs}/>
                <UserDropdown
                  username={username}
                  userPic={userPic}
                  useExternLinks={this.props.useExternLinks}
                  redirPath={this.props.redirPath}
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
          username={username}
          userPic={userPic} userWebsite={userWebsite} userEmail={userEmail}
          useExternLinks={this.props.useExternLinks}
          redirPath={this.props.redirPath}
        />
      </div>
    );
  }
}
TopNavUser.propTypes = {
  redirPath: PropTypes.string,
  useExternLinks: PropTypes.bool,
  user: PropTypes.object.isRequired,
  notifs: PropTypes.array
};
TopNavUser.defaultProps = {
  redirPath: '/',
  useExternLinks: true,
  notifs: null
};

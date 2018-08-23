import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { page } from './routes';
import { getPageName } from '../../lib/helpers';
import { apiLink } from '../data/apiLinks';
import appRoute from '../data/appRoute';

// TODO: consolidate this UserDropdown with the one from TopNavUser
const UserDropdown = ( {username, userPic, redirPath} ) => (
  <li id="dropdown-block">
    <a className="navbar-img dropdown-button" data-activates="user-dropdown">
      <img alt={`looseleaf user ${username}`} className="mod-round" src={userPic} />
      {
        // <div className="arrow-down" />
      }
    </a>
    <ul id="user-dropdown" className="dropdown-content topnav-dropdown">
      <li><a href={`/@${username}`}>Portfolio</a></li>
      <li><a href="/project/new">New Project</a></li>
      <li className="divider" />
      <li><a href={`/@${username}/settings`}>Settings</a></li>
      <li><a href={`${apiLink.logout}?redirPath=${redirPath}`}>Log out</a>
      </li>
      <div className="popover-arrow"></div>
    </ul>
  </li>
);
export default class TopNav extends React.Component {
  static defalutProps = {
    extended: false
  }

  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      stopPropagation: false // Stops event propagation
    });
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '80px' // Ending top style attribute
    });

    $('ul.tabs').tabs();

    this.initializeSticky();

    if(typeof window !== undefined) {
      $(window).scroll(function(){
        this.toggleSignupBtnVisibility()
      }.bind(this))
    }
  }
  initializeSticky() {
    let categories = $('nav .categories-container');
    if (categories.length) {
      categories.pushpin({
        top: categories.offset().top
      });
    }
  }
  toggleSignupBtnVisibility() {
    const signupBtn = $("#signup-btn-tab");
    const categories = $('nav .categories-container');
    if(categories.hasClass('pinned')) {
      signupBtn.css('visibility', 'visible');
    } else if(categories.hasClass('pin-top')) {
      signupBtn.css('visibility', 'hidden');
    }
  }
  closeModal(modalId) {
    $(modalId).modal('close');
  }
  renderLoginBtn() {
    return (
      <a href="#login-modal"
         onClick={this.closeModal.bind(this, '#signup-modal')}
         className="modal-trigger">
        Log in
      </a>
    );
  }
  renderJoinBtn(label, id) {
    return (
      <a id={id}
         href="#signup-modal"
         onClick={this.closeModal.bind(this, '#login-modal')}
         className="btn modal-trigger signup-btn">
        {label}
      </a>
    );
  }
  renderNavHeader(community) {
    return (
      <div className="nav-header center">
        <h4>{community.title}</h4>
        <div className="tagline">
          {community.desc}
        </div>
        { this.renderJoinBtn('Join This Community', 'signup-btn-header') }
      </div>
    );
  }
  renderPrimaryNavInner(selected, community, user, redirPath) {
    return (
      <div className="nav-wrapper-white nav-text-links">
        <div className="brand-logo">
          <Link className="navbar-brand" to={appRoute('userHome')}
              onClick={this.handleLogoClick.bind(this)}
            >
            <img src="http://looseleafapp.com/assets/images/logo/logo.png" alt="LooseLeaf" />
          </Link>
        </div>
        { user ?
            <div>
              <ul className="right">
                <UserDropdown
                  username={user.username} userPic={user.picture}
                  redirPath={redirPath}
                />
              </ul>
            </div>
            :
            null
        }
      </div>
    );
  }
  renderPrimaryNavExtended(selected, community, user, redirPath) {
    return (
      <div id="looseleaf-section-header">
        <nav className="nav-extended grey lighten-4">
          <div className="nav-background">
            <div className="pattern active"></div>
          </div>
          {this.renderPrimaryNavInner(selected, community, user, redirPath)}
          { this.renderNavHeader(community) }
        </nav>
      </div>
    );
  }
  handleLogoClick() {
    window.location = "/";
  }
  renderTabs(selected, communityName) {
    const style = {
      top: 0
    };
    const noMarginBottom = {
      marginBottom: 0
    };
    const styleHeight = {
      height: '48px'
    };
    return (
      <nav className="filter-navbar" style={styleHeight}>
        <div className="categories-wrapper">
          <div className="categories-container pin-top" style={style}>
            <div className="categories grey lighten-4 row" style={noMarginBottom}>
              <div className="col l12 m12 s12">
                <ul id="nav-tabs" className="tabs grey lighten-4">
                  <li className='tab'>
                    <Link
                      id={`tab-one`}
                      className={selected === page(communityName).one.slug ? 'active' : ''}
                      to={page(communityName).one.link}>
                      {page(communityName).one.name}
                    </Link>
                  </li>
                  <li className='tab'>
                    <Link
                      id={`tab-two`}
                      className={selected === page(communityName).two.slug ? 'active' : ''}
                      to={page(communityName).two.link}>
                      {page(communityName).two.name}
                    </Link>
                  </li>
                  <li className='tab'>
                    <Link
                      id={`tab-three`}
                      className={selected === page(communityName).three.slug ? 'active' : ''}
                      to={page(communityName).three.link}>
                      {page(communityName).three.name}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col l2 m2 s2 offset-l1 offset-s2 nav-text-links">
                <ul style={{paddingRight: 4}} className="right">
                  <li>
                    { this.renderJoinBtn('Join', 'signup-btn-tab')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  render() {
    let selected = (typeof this.props.route.path === 'string')
                    ? getPageName(this.props.route.path) : '';
    const redirPath = (typeof this.props.route.path === 'string') ? this.props.route.path : '/';
    return (
      <div>
        {
          this.renderPrimaryNavExtended(selected, this.props.community, this.props.user, redirPath)
        }
        {
          this.renderTabs(selected, this.props.community.name)
        }
      </div>
    );
  }
}

TopNav.propTypes = {
  extended: PropTypes.bool
}
TopNav.defaultProps = {
  extended: false
}

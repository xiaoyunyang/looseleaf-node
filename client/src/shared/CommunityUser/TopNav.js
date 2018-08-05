import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { getNav, tabs } from './routes';
import { getPageName } from '../../lib/helpers';

const UserDropdown = ( {username, userPic} ) => (
  <li id="dropdown-block">
    <a className="navbar-img dropdown-button" data-activates="user-dropdown">
      <img alt={`looseleaf user ${username}`} className="mod-round" src={userPic} />
      <div className="arrow-down" />
    </a>
    <ul id="user-dropdown" className="dropdown-content">
      <li><a href={`/@${username}`}>Portfolio</a></li>
      <li><a href="/project/new">New Project</a></li>
      <li className="divider" />
      <li><a href={`/@${username}/settings`}>Settings</a></li>
      <li><a href="/auth/logout">Log out</a></li>
    </ul>
  </li>
);
export default class TopNav extends React.Component {
  static defalutProps = {
    extended: false
  }
  componentDidMount() {

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

  renderPrimaryNavInner(selected, community, user) {
    return (
      <div className="nav-wrapper-white nav-text-links">
        { user ? null :
            <div className="brand-logo">
              <Link className="navbar-brand" to={`/${community}`}
                  onClick={this.handleLogoClick.bind(this)}
                >
                <img src="http://looseleafapp.com/assets/images/logo/logo.png" alt="LooseLeaf" />
              </Link>
            </div>
        }
        {
          user ? null :
            <div>
              <ul className="right">
                <li>{this.renderJoinBtn('Signup', 'signup-btn-main')}</li>
              </ul>
              <div className="right hide-on-small-only">
                { this.renderLoginBtn() }
              </div>
            </div>
        }
        {
          user ?
            <div>
              <ul className="right">
                <UserDropdown username={user.username} userPic={user.picture}/>
              </ul>
            </div>
            :
            null
        }
      </div>
    );
  }
  renderPrimaryNavExtended(selected, community, user) {
    return (
      <div id="looseleaf-section-header">
        <nav className="nav-extended grey lighten-4">
          <div className="nav-background">
            <div className="pattern active"></div>
          </div>
          {this.renderPrimaryNavInner(selected, community, user)}
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
                      className={selected === tabs.one ? 'active' : ''}
                      to={getNav(communityName).one}>
                      {tabs.one}
                    </Link>
                  </li>
                  <li className='tab'>
                    <Link
                      id={`tab-two`}
                      className={selected === tabs.two ? 'active' : ''}
                      to={getNav(communityName).two}>
                      {tabs.two}
                    </Link>
                  </li>
                  <li className='tab'>
                    <Link
                      id={`tab-three`}
                      className={selected === tabs.three ? 'active' : ''}
                      to={getNav(communityName).three}>
                      {tabs.three}
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
    console.log('In TopNavUser for Community', this.props)
    let selected = (typeof this.props.route.path === 'string')
                    ? getPageName(this.props.route.path) : '';

    return (
      <div>
        {
          this.renderPrimaryNavExtended(selected, this.props.community, this.props.user)
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

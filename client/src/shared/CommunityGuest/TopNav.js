import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { getPageName } from '../../lib/helpers';
import { page } from './routes';
import appRoute from '../data/appRoute';
import { image } from '../data/assetLinks';
import { LoginModal, SignupModal } from '../components/Login/Modal';

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

    if (typeof window !== 'undefined') {
      $(window).scroll(function(){
        this.toggleSignupBtnVisibility();
      }.bind(this));
    }
  }
  initializeSticky() {
    const categories = $('nav .categories-container');
    if (categories.length) {
      categories.pushpin({
        top: categories.offset().top
      });
    }
  }
  toggleSignupBtnVisibility() {
    const signupBtn = $('#signup-btn-tab');
    const loginBtn = $('#login-btn-tab');
    const categories = $('nav .categories-container');
    if (categories.hasClass('pinned')) {
      signupBtn.css('visibility', 'visible');
      loginBtn.css('visibility', 'visible');
    } else if (categories.hasClass('pin-top')) {
      signupBtn.css('visibility', 'hidden');
      loginBtn.css('visibility', 'hidden');
    }
  }
  closeModal(modalId) {
    $(modalId).modal('close');
  }
  handleLogoClick() {
    window.location = '/';
  }
  renderLoginBtn(id) {
    return (
      <a
        id={id}
        href="#login-modal"
        onClick={this.closeModal.bind(this, '#signup-modal')}
        className="modal-trigger login-btn"
      >
        Log in
      </a>
    );
  }
  renderJoinBtn(label, id) {
    return (
      <a
        id={id}
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
  renderPrimaryNavInner(selected, community) {
    return (
      <div className="nav-wrapper-white nav-text-links">
        <div className="brand-logo">
          <a className="navbar-brand" href={appRoute('landingHome')}
              onClick={this.handleLogoClick.bind(this)}
            >
            <img src={image.logo} alt="LooseLeaf" />
          </a>
        </div>
        <div>
          <ul className="right">
            <li>{this.renderJoinBtn('Signup', 'signup-btn-main')}</li>
          </ul>
          <div className="right hide-on-small-only">
            { this.renderLoginBtn('login-btn-main') }
          </div>
        </div>
      </div>
    );
  }
  renderPrimaryNavExtended(selected, community) {
    return (
      <div id="looseleaf-section-header">
        <nav className="nav-extended grey lighten-4">
          <div className="nav-background">
            <div className="pattern active" />
          </div>
          { this.renderPrimaryNavInner(selected, community) }
          { this.renderNavHeader(community) }
        </nav>
      </div>
    );
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
              <div className="col l8 m7 s12 offset-l1">
                <ul id="nav-tabs" className="tabs grey lighten-4">
                  <li className="tab">
                    <Link
                      id="tab-one"
                      className={selected === page(communityName).one.slug ? 'active' : ''}
                      to={page(communityName).one.link}>
                      {page(communityName).one.name}
                    </Link>
                  </li>
                  <li className='tab'>
                    <Link
                      id="tab-two"
                      className={selected === page(communityName).two.slug ? 'active' : ''}
                      to={page(communityName).two.link}>
                      {page(communityName).two.name}
                    </Link>
                  </li>
                  <li className='tab'>
                    <Link
                      id="tab-three"
                      className={selected === page(communityName).three.slug ? 'active' : ''}
                      to={page(communityName).three.link}>
                      {page(communityName).three.name}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col l3 m5 s2 nav-text-links">
                <ul style={{ paddingRight: 4 }} className="right">
                  <li className="hide-on-small-only">
                    { this.renderLoginBtn('login-btn-tab') }
                  </li>
                  <li>
                    { this.renderJoinBtn('Signup', 'signup-btn-tab')}
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
    const location = (typeof this.props.route.path === 'string') ? this.props.route.path : '/';
    const selected = (typeof this.props.route.path === 'string')
      ? getPageName(this.props.route.path) : '';
    return (
      <div>
        {
          this.renderPrimaryNavExtended(selected, this.props.community)
        }
        {
          this.renderTabs(selected, this.props.community.name)
        }
        <LoginModal redirPath={location} />
        <SignupModal redirPath={location} />
      </div>
    );
  }
}

TopNav.propTypes = {
  extended: PropTypes.bool,
  route: PropTypes.object,
};
TopNav.defaultProps = {
  extended: false
};

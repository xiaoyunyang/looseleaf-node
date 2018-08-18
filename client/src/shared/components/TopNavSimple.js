import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { LoginModal, SignupModal } from './Login/Modal';
import { root, getNav, communities } from '../Landing/routes';
import { getPageName } from '../../lib/helpers';
import { landingImg } from '../data/landingLinks';

export default class TopNavSimple extends React.Component {
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

    if (typeof window !== undefined) {
      $(window).scroll(() => {
        this.toggleSignupBtnVisibility()
      });
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
  closeModal(modalId) {
    $(modalId).modal('close');
  }
  renderLoginBtn() {
    return (
      <a
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
  toggleSignupBtnVisibility() {
    const signupBtn = $("#signup-btn-tab");
    const categories = $('nav .categories-container');
    if (categories.hasClass('pinned')) {
      signupBtn.css('visibility', 'visible');
    } else if (categories.hasClass('pin-top')) {
      signupBtn.css('visibility', 'hidden');
    }
  }
  renderLoginBtn() {
    return (
      <a href="#login-modal"
         onClick={this.closeModal.bind(this, '#signup-modal')}
         className="modal-trigger" style={{color: '#00897b'}}>
        Log in
      </a>
    );
  }
  renderSignupBtn(label, id) {
    return (
      <a
        id={id}
        href="#signup-modal"
        onClick={this.closeModal.bind(this, '#login-modal')}
        className="btn modal-trigger signup-btn"
      >
        {label}
      </a>
    );
  }
  renderNavHeader() {
    return (
      <div className="nav-header center">
        <h4>Build Skills by Helping Nonprofits</h4>
        <div className="tagline">
          {'Gain relevant work experience as a developer, designer, and writer'}
        </div>
        { this.renderSignupBtn('Join', 'signup-btn-header') }
      </div>
    );
  }
  renderPrimaryNavExtended(selected) {
    return (
      <div id="looseleaf-section-header">
        <nav className="nav-extended grey lighten-4">
          <div className="nav-background">
            <div className="pattern active"></div>
          </div>
          {this.renderPrimaryNavInner(selected)}
          { this.renderNavHeader() }
        </nav>
      </div>
    );
  }
  renderPrimaryNav(selected) {
    return (
      <div className="navbar-fixed">
        <nav className="grey lighten-4">
          {this.renderPrimaryNavInner(selected)}
        </nav>
      </div>
    );
  }
  // This is the top nav where the logo is displayed
  renderPrimaryNavInner(selected) {
    return (
      <div className="nav-wrapper-white nav-text-links">
        <div className="brand-logo">
          <a href="/" className="navbar-brand" >
            <img src={landingImg.logo} alt="LooseLeaf" />
          </a>
        </div>
        <ul className="right">
          <li>{this.renderSignupBtn('Signup', 'signup-btn-main')}</li>
        </ul>
        <div className="right hide-on-small-only">
          { this.renderLoginBtn() }
        </div>
      </div>
    );
  }

  render() {
    let selected = (typeof this.props.route.path === 'string')
      ? getPageName(this.props.route.path) : '';
    return (
      <div>
        { this.props.extended ?
            this.renderPrimaryNavExtended(selected) :
            this.renderPrimaryNav(selected)
        }
        {
          this.props.extended ?
            this.renderTabs(selected) : null
        }
        <LoginModal />
        <SignupModal />
      </div>
    );
  }
}

TopNavSimple.propTypes = {
  extended: PropTypes.bool,
  route: PropTypes.object,
};
TopNavSimple.defaultProps = {
  extended: false,
  route: {path: undefined}
};

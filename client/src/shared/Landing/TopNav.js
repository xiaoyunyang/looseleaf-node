import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { LoginModal, SignupModal } from '../components/Login/Modal';
import { getPageName } from '../../lib/helpers';
import { image } from '../data/assetLinks';
import appRoute from '../data/appRoute';

const page = {
  one: {name: 'Home', slug: '', link: appRoute('landingHome')},
  two: {name: 'How It Works', slug: 'how-it-works', link: appRoute('landingHowItWorks')},
  three: {name: 'About', slug: 'about', link: appRoute('landingAbout')},
}

export default class TopNavGuest extends React.Component {
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
          <Link className="navbar-brand" to={page.one.link}>
            <img src={image.logo} alt="LooseLeaf" />
          </Link>
        </div>
        <ul className="right">
          <li>{this.renderSignupBtn('Signup', 'signup-btn-main')}</li>
        </ul>
        <div className="right hide-on-small-only">
          { this.renderLoginBtn() }
        </div>
        <ul className="right hide-on-med-and-down">
          <li className={selected === page.one.slug ? 'active' : ''}>
            <Link
              to={page.one.link}>
              {page.one.name}
            </Link>
          </li>
          <li className={selected === page.two.slug ? 'active' : ''}>
            <Link
              to={page.two.link}>
              {page.two.name}
            </Link>
          </li>
          <li className={selected === page.three.slug ? 'active' : ''}>
            <Link
              to={page.three.link}>
              {page.three.name}
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  renderTabs(selected) {
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
              <div className="col l9 m10 s10">
                <ul id="nav-tabs" className="tabs grey lighten-4">
                  <li className='tab'>
                    <Link
                      id={`tab-one`}
                      className={selected === page.one.slug ? 'active' : ''}
                      to={page.one.link}>
                      {page.one.name}
                    </Link>
                  </li>
                  <li className="tab">
                    <Link
                      id="tab-two"
                      className={selected === page.two.slug ? 'active' : ''}
                      to={page.two.link}>
                      {page.two.name}
                    </Link>
                  </li>
                  <li className="tab">
                    <Link
                      id={`tab-three`}
                      className={selected === page.three.slug ? 'active' : ''}
                      to={page.three.link}>
                      {page.three.name}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col l2 m2 s2 offset-l1 offset-s2 nav-text-links">
                <ul style={{ paddingRight: 4 }} className="right">
                  <li>
                    { this.renderSignupBtn('Signup', 'signup-btn-tab')}
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

TopNavGuest.propTypes = {
  extended: PropTypes.bool,
  route: PropTypes.object,
};
TopNavGuest.defaultProps = {
  extended: false,
  route: {path: undefined}
};

import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { LoginModal, SignupModal } from './Login/Modal';
import store from './store';

const root = store.root;

export default class TopNav extends React.Component {
  componentDidMount() {

    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '120px' // Ending top style attribute
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
  renderNavHeader() {
    return (
      <div className="nav-header center">
        <h4>Build Skills by Helping A Good Cause</h4>
        <div className="tagline">
          {'Gain relevant work experience as a developer, designer, and writer'}
        </div>
        { this.renderJoinBtn('Join LooseLeaf', 'signup-btn-header') }
      </div>
    );
  }
  renderPrimaryNav(selected) {
    return (
      <div id="looseleaf-section-header">
        <nav className="nav-extended grey lighten-4">
          <div className="nav-background">
            <div className="pattern active"></div>
          </div>
          <div className="nav-wrapper-white nav-text-links">
            <div className="brand-logo">
              <Link className="navbar-brand" to={`/${root}`}>
                <img src="http://looseleafapp.com/assets/images/logo/logo.png" alt="LooseLeaf" />
              </Link>
            </div>
            <ul className="right">
              <li>{this.renderJoinBtn('Join', 'signup-btn-main')}</li>
            </ul>
            <div className="right hide-on-small-only">
              { this.renderLoginBtn() }
            </div>
            <ul className="right hide-on-med-and-down">
              <li className={selected === root ? 'active' : ''}>
                <Link
                  to={`/${root}`}>
                  Home
                </Link>
              </li>
              <li className={selected === 'how-it-works'? 'active' : ''}>
                <Link
                  to={`/${root}how-it-works`}>
                  How It Works</Link>
              </li>
            </ul>
          </div>
          { this.renderNavHeader() }

        </nav>
      </div>
    );
  }
  renderTabs(selected) {
    const style = {
      top: 0
    };
    const noMarginBottom = {
      marginBottom: 0
    }
    const styleHeight = {
      height: '48px'
    }
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
                      className={selected === 'one'? 'active' : ''}
                      to={`/${root}community/one`}>
                      Developers
                    </Link>
                  </li>
                  <li className='tab'>
                    <Link
                      id={`tab-two`}
                      className={selected === 'two'? 'active' : ''}
                      to={`/${root}community/two`}>
                      Designers
                    </Link>
                  </li>
                  <li className='tab'>
                    <Link
                      id={`tab-three`}
                      className={selected === 'three'? 'active' : ''}
                      to={`/${root}community/three`}>
                      Writers
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
    let selected = '';
    if(typeof this.props.route.path === 'string') {
      selected = this.props.route.path.split('/').pop();
    }
    return (
      <div>
        { this.renderPrimaryNav(selected) }
        { this.renderTabs(selected) }
        <LoginModal />
        <SignupModal />
      </div>
    );
  }
}

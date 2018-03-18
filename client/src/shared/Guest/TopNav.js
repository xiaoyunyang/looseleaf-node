import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { LoginModal, SignupModal } from './Login/Modal';

const root = 'public';

export default class TopNav extends React.Component {
  componentDidMount() {
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '120px', // Ending top style attribute
    });
    $('ul.tabs').tabs();
  }
  closeModal(modalId) {
    $(modalId).modal('close');
  }
  renderTabs(selected) {
    return (
      <ul id="nav-tabs" className="tabs grey lighten-4">
        <li className='tab'>
          <Link
            id={`tab-one`}
            className={selected === 'one'? 'active' : ''}
            to={`/${root}/community/one`}
            >
            One
          </Link>
        </li>
        <li className='tab'>
          <Link
            id={`tab-two`}
            className={selected === 'two'? 'active' : ''}
            to={`/${root}/community/two`}
            >
            Two
          </Link>
        </li>
        <li className='tab'>
          <Link
            id={`tab-three`}
            className={selected === 'three'? 'active' : ''}
            to={`/${root}/community/three`}
            >
            Three
          </Link>
        </li>
      </ul>
    );
  }
  render() {
    let selected = '';
    if(typeof this.props.route.path === 'string') {
      selected = this.props.route.path.split('/').pop();
    }
    return (
      <div id="navbar-extended" className="navbar-fixed">
        <nav className="navbar-fixed nav-extended grey lighten-4">
          <div className="nav-wrapper-white nav-text-links">
            <div className="brand-logo">
              <Link className="navbar-brand" to={`/${root}`}>
                <img src="http://looseleafapp.com/assets/images/logo/logo.png" alt="LooseLeaf" />
              </Link>
            </div>
            <ul className="right">
              <li>
                <a id="signup-btn"
                   href="#signup-modal"
                   onClick={this.closeModal.bind(this, '#login-modal')}
                   className="btn modal-trigger">
                  Join
                </a>
              </li>
            </ul>
            <ul className="right hide-on-small-only">
              <li>
                <a className="text-green modal-trigger"
                   href="#login-modal"
                   onClick={this.closeModal.bind(this, '#signup-modal')}>
                  Log in
                </a>
              </li>
            </ul>
            <ul className="right hide-on-med-and-down">
              <li className={selected === root ? 'active' : ''}>
                <Link
                  to={`/${root}`}>
                  Home
                </Link>
              </li>
              <li className={selected === 'how-it-works'? 'active' : ''}>
                <Link
                  to={`/${root}/how-it-works`}>
                  How It Works</Link>
              </li>
            </ul>
          </div>
          {this.renderTabs(selected)}
        </nav>
        <LoginModal />
        <SignupModal />
      </div>
    );
  }
}

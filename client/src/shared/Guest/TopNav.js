import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const root = 'public';

class MobileSideNav extends React.Component {
  componentDidMount() {
    $('.button-collapse').sideNav({
      edge: 'left',
      closeOnClick: true
    });
  }
  render() {
    return (
      <div>
        <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
        <ul className="side-nav" id="mobile-menu">
          <li><Link to={`/${root}`} className="active">Home</Link></li>
          <li><Link to={`/${root}/how-it-works`}>How It Works</Link></li>
          <li><a href="">Login</a></li>
        </ul>
      </div>
    );
  }
}

const SocialLogin = ({header, action}) => (
  <div className="modal-content">
    <div className="row container center">
      <h5 className="text-brown">{header}</h5>
    </div>
    <div className="row center">
      <div className="col s12 m10 offset-m1 l8 offset-l2 social-logins">
        <div className="btn-facebook">
          <a className="waves-effect waves-light btn modal-trigger" href="/login/facebook">
            <i className="fa fa-facebook fa-lg"></i>
            {action}  with Facebook
          </a>
        </div>
      </div>
      <div className="col s12 m10 offset-m1 l8 offset-l2 social-logins">
        <div className="btn-github">
          <a className="waves-effect waves-light btn modal-trigger" href="/login/google">
            <i className="fa fa-github fa-lg"></i>
            {action} with Github
          </a>
        </div>
      </div>
    </div>
    <div className="row or-divider">
      <span>OR</span>
    </div>
    <LocalLogin action={action}/>
  </div>
);

class LocalLogin extends React.Component {
  renderForgotPass() {
    if(this.props.action === 'Continue') {
      return (
        <div className="container">
          <div className="col s12 m12 l12">
            <a className="offset-l6" href="">Forgot password</a>
          </div>
        </div>
      );
    } else {
      return;
    }
  }
  render() {
    return (
      <div className="col s12 m10 offset-m1 l8 offset-l2 center">
        <div className="row">
          <form className="col s12">
            <div className="input-field col s12 m6 l6">
              <input type="email" className="validate"/>
              <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>

            </div>
            <div className="input-field col s12 m6 l6">
              <input type="password" className="validate"/>
              <label htmlFor="password"><i className="fa fa-lock"></i> Password</label>
              { this.renderForgotPass() }
            </div>
          </form>
        </div>
        <a className="waves-effect waves-light btn modal-trigger" href="#singup-modal">
          {this.props.action} with Email
        </a>
      </div>
    );
  }
}

const SignupModal = () => (
  <div id="signup-modal" className="modal">
    <SocialLogin
      action="Join"
      header="Join LooseLeaf"/>
    <div className="row center hero">
      Already a member? <a className="modal-trigger modal-action modal-close" href="#login-modal">Log in</a>
    </div>
  </div>
)
const LoginModal = () => (
  <div id="login-modal" className="modal">
    <SocialLogin
      action="Continue"
      header="Welcome Back!"/>
    <div className="row center hero">
      New to LooseLeaf? <a className="modal-trigger modal-action modal-close" href="#signup-modal">Sign up</a>
    </div>
  </div>
)

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
  }
  closeModal(modalId) {
    $(modalId).modal('close');
  }
  renderTabs(selected) {
    return (
      <ul id="nav-tabs" className="tabs grey lighten-4">
        <li className="tab">
          <Link
            id={`tab-one`}
            to={`/${root}/community/one`}
            className={selected === 'one'? 'active' : ''}
            >
            One
          </Link>
        </li>
        <li className="tab">
          <Link
            id={`tab-two`}
            to={`/${root}/community/two`}
            className={selected === 'two'? 'active' : ''}
            >
            Two
          </Link>
        </li>
        <li className="tab">
          <Link
            id={`tab-three`}
            to={`/${root}/community/three`}
            className={selected === 'three'? 'active' : ''}
            >
            Three
          </Link>
        </li>
      </ul>
    );
  }
  render() {
    let selected = '';
    if (typeof window !== 'undefined') {
      selected = document.location.pathname.split('/').pop();
      $(`#tab-${selected}`).trigger('click');
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
                <a id="signup-btn" href="#signup-modal"
                        onClick={this.closeModal.bind(this, '#login-modal')}
                        className="btn modal-trigger">
                  Join
                </a>
              </li>
            </ul>
            <ul className="right hide-on-small-only">
              <li>
                <a className="text-green modal-trigger" href="#login-modal"
                        onClick={this.closeModal.bind(this, '#signup-modal')}>
                  Log in
                </a>
              </li>
            </ul>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to={`/${root}`}>Home</Link>
              </li>
              <li>
                <Link to={`/${root}/how-it-works`}>How It Works</Link>
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

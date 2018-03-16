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
        <div className="row container">
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
  openModal(id) {
    console.log('want to open modal '+id)
  }
  componentDidMount() {
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 100, // Transition in duration
      out_duration: 150, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
      //ready: function() { alert('Ready'); }, // Callback for Modal open
      //complete: function() { alert('Closed'); } // Callback for Modal close
    });
  }
  closeModal(modalId) {
    console.log('close modal with modalId = '+modalId)

    $(modalId).modal('close');
  }
  render() {
    // TODO: active nav from server and client disagree. server
    // rendered page does not know what the route is. Why?
    let selected = '';
    if (typeof document !== 'undefined') {
      selected = document.location.pathname.split('/').pop();
      $(`#nav-${selected}`).trigger('click');
    }

    return (
      <div className="navbar-fixed">
        <nav className="grey lighten-4">
          <div className="nav-wrapper-white nav-text-links">
            <div className="brand-logo">
              <Link className="navbar-brand" to={`/${root}`}>
                <img src="http://looseleafapp.com/assets/images/logo/logo.png" alt="LooseLeaf" />
              </Link>
            </div>
            <ul className="right hide-on-med-and-down">
              <li className={selected === root ? 'active' : ''}>
                <Link id={`nav-${root}`} to={`/${root}`}>Home</Link>
              </li>
              <li className={selected === 'how-it-works' ? 'active' : ''}>
                <Link id="nav-how-it-works" to={`/${root}/how-it-works`}>How It Works</Link>
              </li>
              <li>
                <a className="text-green modal-trigger" href="#login-modal"
                        onClick={this.closeModal.bind(this, '#signup-modal')}>
                  Log in
                </a>
              </li>
              <li>
                <a id="signup-btn" href="#signup-modal"
                        onClick={this.closeModal.bind(this, '#login-modal')}
                        className="btn modal-trigger">
                  Join
                </a>
              </li>
            </ul>
            <MobileSideNav />
          </div>
        </nav>
        <LoginModal />
        <SignupModal />
      </div>
    );
  }
}

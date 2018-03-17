import React from 'react';
import LoginForm from './LoginForm';

const SignupModal = () => (
  <div id="signup-modal" className="modal">
    <LoginForm
      action="Join"
      header="Join LooseLeaf"
    />
    <div className="row center hero">
      Already a member? <a className="modal-trigger modal-action modal-close" href="#login-modal">Log in</a>
    </div>
  </div>
);

const LoginModal = () => (
  <div id="login-modal" className="modal">
    <LoginForm
      action="Continue"
      header="Welcome Back!"
    />
    <div className="row center hero">
      New to LooseLeaf? <a className="modal-trigger modal-action modal-close" href="#signup-modal">Sign up</a>
    </div>
  </div>
);

export { SignupModal, LoginModal };

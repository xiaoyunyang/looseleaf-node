import React from 'react';
import LoginForm from './LoginForm';
import LegalInfo from './LegalInfo';

const SignupModal = ({redirPath}) => (
  <div id="signup-modal" className="modal">
    <LoginForm
      action="Join"
      header="Join LooseLeaf"
      redirPath={redirPath}
    />
    <div className="row center hero">
      <div className="col l12 m12 s12">
        Already a member? <a className="modal-trigger modal-action modal-close" href="#login-modal">Log in</a>
      </div>
      <LegalInfo />
    </div>
  </div>
);

const LoginModal = ({redirPath}) => (
  <div id="login-modal" className="modal">
    <LoginForm
      action="Continue"
      header="Welcome Back!"
      redirPath={redirPath}
    />
    <div className="row center hero">
      <div className="col l12 m12 s12">
        New to LooseLeaf? <a className="modal-trigger modal-action modal-close" href="#signup-modal">Sign up</a>
      </div>
      <LegalInfo />
    </div>
  </div>
);

export { SignupModal, LoginModal };

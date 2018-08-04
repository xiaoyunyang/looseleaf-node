import React from 'react';
import LocalLogin from './LocalLogin';
import SocialLogin from './SocialLogin';

const LoginForm = ({header, action}) => (
  <div className="modal-content">
    <div className="row container center">
      <h5 className="text-brown">{header}</h5>
    </div>
    <div className="row center">
      <SocialLogin oauthOpts={['facebook', 'github']} action={action} />
    </div>
    <div className="row or-divider">
      <span>OR</span>
    </div>
    <LocalLogin action={action} />
  </div>
);

export default LoginForm;

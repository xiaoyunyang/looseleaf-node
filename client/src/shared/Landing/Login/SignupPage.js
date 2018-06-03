import React from 'react';
import LocalLogin from './LocalLogin';
import SocialLogin from './SocialLogin';
import TopNav from '../TopNav';

const SignupPage = ({ route }) => (
  <div>
    <TopNav route={route} />
    <div className="container">
      <h5 className="text-brown">Signup Page</h5>
    </div>
  </div>
);

export default SignupPage;

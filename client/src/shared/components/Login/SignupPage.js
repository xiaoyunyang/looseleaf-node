import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import appRoute from '../../data/appRoute';
import LegalInfo from './LegalInfo';

const SignupPage = ({ route }) => (
  <div className="section-white row" style={{ minHeight: '45em' }}>
    <div className="col s12 m10 l10 offset-m1 offset-l1" style={{ paddingTop: '50px' }}>
      <LoginForm
        action="Join"
        header="Signup"
        redirPath="/"
      />
      <div className="row center hero">
        <div className="col l12 m12 s12">
          <h6 style={{ marginTop: 40 }}>
            Already a member? <Link to={appRoute('login')}>Log in</Link>
          </h6>
        </div>
        <LegalInfo />
      </div>
    </div>
  </div>
);

export default SignupPage;

import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = ({ route }) => (
  <div className="section-white row" style={{ minHeight: '45em' }}>
    <div className="col s12 m6 l10 offset-m3 offset-l1" style={{paddingTop: '50px'}}>
      <LoginForm
        action="Continue"
        header="Login"
      />
      <div className="row center hero">
        <div className="col l12 m12 s12">
          <h6 style={{ marginTop: 40 }}>
            New to LooseLeaf? <a href="/signup">Sign up</a>
          </h6>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;

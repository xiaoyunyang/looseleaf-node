import React from 'react';
import PropTypes from 'prop-types';
const loginPath = 'http://localhost:3001/auth/login';
const signupPath = 'http://localhost:3001/auth/signup';

class LocalLogin extends React.Component {
  constructor() {
    super();
    LocalLogin.propTypes = {
      action: PropTypes.string.isRequired
    };
  }
  renderForgotPass() {
    if (this.props.action === 'Continue') {
      return (
        <div className="container">
          <div className="col s12 m12 l12">
            <a className="offset-l6" href="/forgot">Forgot password</a>
          </div>
        </div>
      );
    }
    return <div />;
  }
  getFormAction(action) {
    if(action === 'Continue') {
      return loginPath;
    }
    return signupPath;
  }

  render() {
    return (
      <div className="col s12 m10 offset-m1 l8 offset-l2 center">
        <div className="row">
          <form action={this.getFormAction(this.props.action)} 
                method="post"
                className="col s12">
            <div className="input-field col s12 m6 l6">
              <input type="email" className="validate" />
              <label htmlFor="email"><i className="fa fa-envelope" /> Email</label>
            </div>
            <div className="input-field col s12 m6 l6">
              <input type="password" className="validate" />
              <label htmlFor="password"><i className="fa fa-lock" /> Password</label>
              { this.renderForgotPass() }
            </div>
          </form>
        </div>
        <a className="waves-effect waves-light btn modal-trigger" href="#signup-modal">
          {this.props.action} with Email
        </a>
      </div>
    );
  }
}
export default LocalLogin;

import React from 'react';
import PropTypes from 'prop-types';
import FlashNotif from '../FlashNotif';
import axios from 'axios';
import { staticApiLink } from '../../data/apiLinks';
import appRoute from '../../data/appRoute';

const loginPath = staticApiLink.login;
const signupPath = staticApiLink.signup;


/* TODO: The propTypes checking is not the best. Check out this article for
   best practice for writing react components:
   https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8
*/
class LocalLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flash: {
        state: 'ok',
        msg: ''
      },
      formFields: {
        email: '',
        password: ''
      }
    };
  }
  // TODO: detect invalid email addresses or email address with invalid characters
  // such as angle brackets
  handleInput(e) {
    const formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    });
  }
  handleKeyPress(e) {
    const code = e.keyCode || e.which;
    if (code === 13) { // 13 is the enter keycode
      this.handleSubmit(this.state.formFields);
    }
  }
  // TODO: prevent axios from posting if client side validation has an error
  handleSubmit(formFields) {
    axios.post(this.getPostPath(this.props.action), formFields)
      .then(res => {
        // Perform action based on response, such as flashing error notif
        if (res.statusText === 'error') {
          this.setState({
            flash: { state: res.statusText, msg: res.data }
          });
        } else if (res.statusText === 'OK') {
          window.location = this.props.redirPath;
        }
      })
      .catch((error) => {
        console.log(error);
        //Perform action based on error
      });
  }
  renderForgotPass() {
    const style = {
      marginTop: -16
    };
    if (this.props.action === 'Continue') {
      return (
        <div style={style} className="col l8 offset-l5 m10 offset-m4 s12">
            <a className="" href="/forgot">Forgot password</a>
          </div>
      );
    }
    return null;
  }
  getPostPath(action) {
    if (action === 'Continue') {
      return loginPath;
    }
    return signupPath;
  }
  render() {
    return (
      <div className="col s12 m10 offset-m1 l8 offset-l2 center">
        <div className="row">
          <FlashNotif state={this.state.flash.state} msg={this.state.flash.msg} />
          <form className="col s12" onSubmit={this.handleInput.bind(this)}>
            <div className="input-field col s12 m6 l6">
              <input type="email" name="email" className="validate" onChange={this.handleInput.bind(this)} />
              <label htmlFor="email"><i className="fa fa-envelope" /> Email</label>
            </div>
            <div className="input-field col s12 m6 l6">
              <input
                type="password"
                name='password'
                className="validate"
                onChange={this.handleInput.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              />
              <label htmlFor="password"><i className="fa fa-lock" /> Password</label>
              { this.renderForgotPass() }
            </div>
          </form>
        </div>
        <button
          className="btn"
          style={{ marginTop: 20 }}
          onClick={this.handleSubmit.bind(this, this.state.formFields)}
        >
          {`${this.props.action} with Email`}
        </button>
      </div>
    );
  }
}
LocalLogin.propTypes = {
  action: PropTypes.string.isRequired,
  redirPath: PropTypes.string
};
LocalLogin.defaultProps = {
  redirPath: appRoute('userHome')
};
export default LocalLogin;

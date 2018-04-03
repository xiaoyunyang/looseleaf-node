import React from 'react';
import PropTypes from 'prop-types';
import FlashNotif from './FlashNotif';
import axios from 'axios';

const redirPath = 'http://localhost:3001';
const loginPath = 'http://localhost:3001/auth/login';
const signupPath = 'http://localhost:3001/auth/signup';


/* TODO: The propTypes checking is not the best. Check out this article for
   best practice for writing react components:
   https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8
*/
class LocalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        email: '',
        password: ''
      }
    }
  }
  handleInput(e) {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    })
  }
  handleKeyPress(e) {
    const code = e.keyCode || e.which;
    if(code === 13) { //13 is the enter keycode
      this.handleSubmit(this.state.formFields);
    }
  }
  handleSubmit(formFields) {
    console.log('submit btn pressed. action = ', this.getFormAction(this.props.action))

    axios.post(this.getFormAction(this.props.action), formFields)
      .then(function(response){
        console.log('login via axios is a success')
        console.log(response);

        window.location = "/";

        //Perform action based on response, such as flashing error notif
      })
      .catch(function(error) {
        console.log(error);
        //Perform action based on error
      });
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
          <FlashNotif state="ok"/>
          <form className="col s12" onSubmit={this.handleInput.bind(this)}>
            <div className="input-field col s12 m6 l6">
              <input type="email" name='email' className="validate" onChange={this.handleInput.bind(this)} />
              <label htmlFor="email"><i className="fa fa-envelope" /> Email</label>
            </div>
            <div className="input-field col s12 m6 l6">
              <input type="password" name='password' className="validate"
                     onChange={this.handleInput.bind(this)}
                     onKeyPress={this.handleKeyPress.bind(this)}/>
              <label htmlFor="password"><i className="fa fa-lock" /> Password</label>
              { this.renderForgotPass() }
            </div>
          </form>
        </div>

        <a className="btn"
          onClick={this.handleSubmit.bind(this, this.state.formFields)}>
          {`${this.props.action} with Email`}
        </a>

      </div>
    );
  }
}
LocalLogin.propTypes = {
  action: PropTypes.string.isRequired,
  formFields: PropTypes.object
};
export default LocalLogin;

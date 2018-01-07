import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { facebookLogin } from '../../actions/oauth';
import Messages from '../Messages';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignin(event) {
    event.preventDefault();
    this.props.dispatch(Signin(this.state.name, this.state.email, this.state.password));
  }
  handleFacebook() {
    this.props.dispatch(facebookLogin())
  }
  render() {
    return (
      <div>
        <Messages messages={this.props.messages}/>
        <button onClick={this.handleFacebook.bind(this)} className="button facebook">Sign in with Facebook</button>
        <p><Link to="/forgot">Forgot your password?</Link></p>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Signin);

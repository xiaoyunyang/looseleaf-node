import React from 'react';
import { connect } from 'react-redux'
import { submitContactForm } from '../actions/contact';
import Messages from './Messages';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', message: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(submitContactForm(this.state.name, this.state.email, this.state.message));
  }

  render() {
    return (
      <div className="expanded row">
        <div className="row">
          <h3>Contact Form</h3>
          <Messages messages={this.props.messages}/>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
              <div className="medium-8 columns">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus/>
              </div>
            </div>
            <div className="row">
              <div className="medium-8 columns">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
              </div>
            </div>
            <div className="row">
              <div className="medium-8 columns">
                <label htmlFor="message">Body</label>
                <textarea name="message" id="message" rows="7" value={this.state.message} onChange={this.handleChange.bind(this)}></textarea>
              </div>
            </div>
            <button type="submit" className="button">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Contact);

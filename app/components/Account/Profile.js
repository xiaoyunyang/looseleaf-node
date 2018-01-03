import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount } from '../../actions/auth';
import { link, unlink } from '../../actions/oauth';
import Messages from '../Messages';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email,
      name: props.user.name,
      gender: props.user.gender,
      location: props.user.location,
      website: props.user.website,
      gravatar: props.user.gravatar,
      password: '',
      confirm: ''
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    this.props.dispatch(updateProfile(this.state, this.props.token));
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token));
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    this.props.dispatch(deleteAccount(this.props.token));
  }

  handleLink(provider) {
    this.props.dispatch(link(provider))
  }

  handleUnlink(provider) {
    this.props.dispatch(unlink(provider));
  }

  render() {
    const facebookLinkedAccount = this.props.user.facebook ? (
      <a role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'facebook')}>Unlink your Facebook account</a>
    ) : (
      <a role="button" onClick={this.handleLink.bind(this, 'facebook')}>Link your Facebook account</a>
    );
    const twitterLinkedAccount = this.props.user.twitter ? (
      <a role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'twitter')}>Unlink your Twitter account</a>
    ) : (
      <a role="button" onClick={this.handleLink.bind(this, 'twitter')}>Link your Twitter account</a>
    );
    const googleLinkedAccount = this.props.user.google ? (
      <a role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'google')}>Unlink your Google account</a>
    ) : (
      <a role="button" onClick={this.handleLink.bind(this, 'google')}>Link your Google account</a>
    );
    const githubLinkedAccount = this.props.user.github ? (
      <a role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'github')}>Unlink your Github account</a>
    ) : (
      <a role="button" onClick={this.handleLink.bind(this, 'github')}>Link your Github account</a>
    );
    return (
      <div className="column row">
        <Messages messages={this.props.messages}/>
        <form onSubmit={this.handleProfileUpdate.bind(this)}>
          <h5>Profile Information</h5>
          <div className="row">
            <div className="medium-7 columns">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="medium-7 columns">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="medium-7 columns">
              <label>Gender</label>
              <input type="radio" name="gender" id="male" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange.bind(this)}/>
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="female" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange.bind(this)}/>
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <div className="row">
            <div className="medium-7 columns">
              <label htmlFor="location">Location</label>
              <input type="text" name="location" id="location" value={this.state.location} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="medium-7 columns">
              <label htmlFor="website">Website</label>
              <input type="text" name="website" id="website" value={this.state.website} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="medium-7 columns">
              <label>Gravatar</label>
              <img src={this.state.gravatar} className="gravatar" width="100" height="100"/>
            </div>
          </div>
          <button type="submit" className="success button">Update Profile</button>
        </form>
        <form onSubmit={this.handleChangePassword.bind(this)}>
          <h5>Change Password</h5>
          <div className="row">
            <div className="medium-7 columns">
              <label htmlFor="password">New Password</label>
              <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="medium-7 columns">
              <label htmlFor="confirm">Confirm Password</label>
              <input type="password" name="confirm" id="confirm" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <button type="submit" className="success button">Change Password</button>
        </form>
        <div className="row">
          <div className="medium-7 columns">
            <h5>Linked Accounts</h5>
            <p>{facebookLinkedAccount}</p>
            <p>{twitterLinkedAccount}</p>
            <p>{googleLinkedAccount}</p>
            <p>{githubLinkedAccount}</p>
          </div>
        </div>
        <form onSubmit={this.handleDeleteAccount.bind(this)}>
          <h5>Delete Account</h5>
          <div className="row">
            <div className="medium-7 columns">
              <p>You can delete your account, but keep in mind this action is irreversible.</p>
            </div>
          </div>
          <button type="submit" className="alert button">Delete my account</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Profile);

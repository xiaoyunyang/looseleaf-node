import React from 'react';
import TopNav from '../TopNav';

class Settings extends React.Component {
  render() {
    console.log("Settings for user", this.props.user)
    return (
      <div>
        <TopNav route={this.props.route} user={this.props.user}/>
        <div className="container">
          <h2>{`Settings for ${this.props.user.username}`}</h2>
          <a className="btn" href="">Delete Profile</a>
        </div>
      </div>
    );
  }
}

export default Settings;

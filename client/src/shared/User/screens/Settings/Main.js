import React from 'react';
import TopNav from '../../TopNav';
import GeneralForm from './GeneralForm';
import AboutForm from './AboutForm';

class Settings extends React.Component {
  render() {
    console.log("Settings for user", this.props.user)
    return (
      <div className='section-white'>
        <TopNav route={this.props.route} user={this.props.user}/>
        <div className="container">
          <h2>Settings</h2>
          <GeneralForm
            email={this.props.user.email}
            displayName={this.props.user.displayName}
            username={this.props.user.username}
            picture={this.props.user.picture}
            />
          <AboutForm
            bio={this.props.user.bio}
            location={this.props.user.location}
            website={this.props.user.website}
            interests={this.props.user.interests}
            communities={this.props.user.communities}
            />

          <div className="card-panel white">
            <h5>Deactivate account</h5>
            <p>
              {
                "Deactivating your account will remove it from LooseLeaf. You can sign back in anytime to reactivate your account and restore its content."
              }
            </p>
            <a href="">Deactivate account</a>
            <div className="or-divider"/>
            <h5>Delete account</h5>
            <p>
              {
                "Permanently delete your account and all of your content."
              }
            </p>
            <a href="">Delete account</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;

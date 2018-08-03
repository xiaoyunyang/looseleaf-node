import React from 'react';
import TopNav from '../../../components/TopNavUser';
import GeneralForm from './GeneralForm';
import AboutForm from './AboutForm';

const Settings = (props) => (
  <div className='section-white'>
    <TopNav route={props.route} user={props.user}/>
    <div className="container">
      <h2>Settings</h2>
      <GeneralForm
        userId={props.user._id}
        email={props.user.email}
        displayName={props.user.displayName}
        username={props.user.username}
        picture={props.user.picture}
      />
      <AboutForm
        userId={props.user._id}
        bio={props.user.bio}
        location={props.user.location}
        website={props.user.website}
        interests={props.user.interests}
        communities={props.user.communities}
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


export default Settings;

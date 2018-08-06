import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
import { tabs } from '../routes';
import PostEditor from '../../components/Form/PostEditor';

export default class Two extends React.Component {
  handlePost(d) {
    console.log('creating post for ', d);
  }
  render() {
    return (
      <div>
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="container">
          <div className="row">
            <div id={tabs.two} className="col s12 m12 l12">
              <h3>Announcements</h3>
              <PostEditor
                handlePost={d => this.handlePost(d)}
                userDisplayName={this.props.user.displayName}
                userPic={this.props.user.picture}
                placeholder="Post an announcement to this community."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

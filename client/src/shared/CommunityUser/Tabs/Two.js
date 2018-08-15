import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
import { tabs } from '../routes';
import PostEditor from '../../components/Form/PostEditor';
import PostDisplay from '../../components/Form/PostDisplay';

export default class Two extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: null
    };
  }
  handlePost(d) {
    // The d received here are in the format that can be saved to the DB
    this.setState({
      editorContent: d
    });
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
              <PostDisplay
                userDisplayName={this.props.user.displayName}
                userPic={this.props.user.picture}
                editorContent={this.state.editorContent}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

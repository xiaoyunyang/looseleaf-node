import React from 'react';
import TopNav from '../TopNav';
import { communityPage as page }  from '../../data/appPage';
import Discussion from '../../components/Discussion';

export default class Two extends React.Component {
  render() {
    const userInfo = this.props.state.user.loggedinUser;
    const communityInfo = this.props.state.community.info;
    return (
      <div className="section-white">
        <TopNav
          route={this.props.route}
          user={userInfo}
          community={communityInfo}
          actions={this.props.actions}
        />
        <div className="community-page container">
          <div id={page(communityInfo.slug).two.slug}>
            <h3>{page(communityInfo.slug).two.name}</h3>
            <Discussion
              context='community'
              communitySlug={communityInfo.slug}
              user={this.props.state.user.loggedinUser}
              newPostPlaceholder='Post an announcement or question to this community.'
            />
          </div>
        </div>
      </div>
    );
  }
}

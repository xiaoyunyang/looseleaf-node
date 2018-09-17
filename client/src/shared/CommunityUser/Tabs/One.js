import React from 'react';
import TopNav from '../TopNav';
import { communityPage as page }  from '../../data/appPage';
import Projects from '../../components/Collection/Projects/Main';

export default class One extends React.Component {
  render() {
    const loggedinUser = this.props.state.user.loggedinUser;
    const communityInfo = this.props.state.community.info;
    return (
      <div className="section-white" style={{minHeight: '100vh'}}>
        <TopNav
          route={this.props.route}
          user={loggedinUser}
          community={communityInfo}
          actions={this.props.actions}
        />
        <div className="community-page container">
          <div className="row">
            <div id={page(communityInfo.slug).one.slug} className="col s12">
              <h3>{page(communityInfo.slug).one.name}</h3>
              <Projects
                context='community'
                communitySlug={communityInfo.slug}
                loggedinUser={loggedinUser}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

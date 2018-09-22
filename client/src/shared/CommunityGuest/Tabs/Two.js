import React from 'react';
import TopNav from '../TopNav';
import { communityPage as page }  from '../../data/appPage';
import Discussion from '../../components/Discussion/Main';

export default class Two extends React.Component {
  render() {
    const context = { name: 'community', queryBy: this.props.community.slug };
    return (
      <div className="section-white" style={{minHeight: '100vh'}}>
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="community-page container">
          <div id={page(this.props.community.slug).two.slug}>
            <h3>{page(this.props.community.slug).two.name}</h3>
              <Discussion
                context={context}
              />
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import TopNav from '../TopNav';
import { communityPage as page }  from '../../data/appPage';
import Discussion from '../../components/Discussion';

export default class Two extends React.Component {
  render() {
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="community-page container">
          <div id={page(this.props.community.slug).two.slug}>
            <h3>{page(this.props.community.slug).two.name}</h3>
              <Discussion
                newPostPlaceholder='Post an announcement or question to this community.'
              />
          </div>
        </div>
      </div>
    );
  }
}

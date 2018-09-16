import React from 'react';
import TopNav from '../TopNav';
import { communityPage as page }  from '../../data/appPage';
import Projects from '../../components/Collection/Projects/Main';

export default class One extends React.Component {
  render() {
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="community-page container">
          <div className="row">
            <div id={page(this.props.community.slug).one.slug} className="col s12">
              <h3>{page(this.props.community.slug).one.slug}</h3>
              <Projects
                context='community'
                communitySlug={this.props.community.slug}
                loggedinUser={null}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

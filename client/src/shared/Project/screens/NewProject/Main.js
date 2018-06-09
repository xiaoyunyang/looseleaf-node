import React from 'react';
import TopNav from '../../../components/TopNavUser';
import ProjectForm from './ProjectForm';

export default class extends React.Component {
  render() {
    return (
      <div className='section-white'>
        <TopNav route={this.props.route} user={this.props.user} useExternLinks={true}/>
        <div className="container">
          <h4>New Project</h4>
          <ProjectForm
            bio={this.props.user.bio}
            location={this.props.user.location}
            website={this.props.user.website}
            interests={this.props.user.interests}
            communities={this.props.user.communities}
            />
        </div>

      </div>
    );
  }
}

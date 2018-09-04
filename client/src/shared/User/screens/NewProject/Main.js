import React from 'react';
import TopNav from '../../../components/TopNavUser/Main';
import ProjectForm from './ProjectForm';
import { interests, platforms } from '../../../data/TempData';

export default class extends React.Component {
  render() {
    return (
      <div className="section-white" id="project-form">
        <TopNav route={this.props.route} user={this.props.user.info} />
        <div className="container">
          <h4>New Project</h4>
          <ProjectForm
            user={this.props.user.info}
            projectTypes={['Software Development', 'Design', 'Writng', 'Data Science', 'Illustration', 'Video Production']}
            tags={interests}
            platforms={platforms}
            aboutMe={this.props.user.info.bio}
            people={['Andrew Fenner', 'Peter Preston', 'Xiaoyun Yang']}
            />
        </div>
      </div>
    );
  }
}

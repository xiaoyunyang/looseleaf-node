import React from 'react';
import TopNav from '../../../components/TopNavUser';
import ProjectForm from './ProjectForm';
import {interests, communities, platforms} from './../../../components/TempData';

export default class extends React.Component {
  render() {
    return (
      <div className="section-white" id="project-form">
        <TopNav route={this.props.route} user={this.props.user} useExternLinks={true}/>
        <div className="container">
          <h4>New Project</h4>
          <ProjectForm
            user={this.props.user}
            projectTypes={['Software Development', 'Design', 'Writng', 'Data Science', 'Illustration', 'Video Production']}
            tags={interests}
            platforms={platforms}
            aboutMe={this.props.user.bio}
            people={['Andrew Fenner', 'Peter Preston', 'Xiaoyun Yang']}
            />
        </div>
      </div>
    );
  }
}

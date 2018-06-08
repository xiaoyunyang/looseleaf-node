import React from 'react';
import TopNav from '../../../components/TopNavUser';
import AboutForm from './AboutForm';
import InputDropdown from './InputDropdown';

const projects = [
  'webdev',
  'mobiledev'
]

export default class extends React.Component {
  render() {
    return (
      <div className='section-white'>
        <TopNav route={this.props.route} user={this.props.user}/>
        <div className="container">
          <h2>New Project</h2>
          <AboutForm
            bio={this.props.user.bio}
            location={this.props.user.location}
            website={this.props.user.website}
            interests={this.props.user.interests}
            communities={this.props.user.communities}
            />
          <div className="card-panel white">
            <h5>Project Type</h5>
            <InputDropdown
              id='select-project'
              label='Choose Project'
              choices={projects}
              setState={d => this.setState({selectedProject: d})}
              />
          </div>
          <div className="card-panel white">
            <h5>Deadline</h5>
            <p>{"Set deadline. You can always change the deadline."}</p>
            <div className="or-divider"/>
            <h5>Invite People</h5>
            <p>
              {
                "Invite People to work on the project."
              }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import TopNav from '../../../components/TopNavUser/Main';
import ProjectForm from '../../../components/Form/ProjectForm';
import { apiLink } from '../../../data/apiLinks';
import { getApiData } from '../../../../lib/helpers';
import { interests, platforms } from '../../../data/TempData';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: []
    }
  }
  componentDidMount() {
    this.loadPeople();
  }
  loadPeople() {
    const url = apiLink.users;
    const setApiData = users => {
      const people = users.map(user => {
        const out = {
          name: user.displayName,
          picture: user.picture
        }
        return out;
      });
      this.setState({people: people})
    }
    getApiData(url, setApiData);
  }
  render() {
    return (
      <div className="section-white" id="project-form">
        <TopNav route={this.props.route} user={this.props.user.loggedinUser} useExternLinks />
        <div className="container">
          <h4>Edit Project</h4>
          <ProjectForm
            user={this.props.user.loggedinUser}
            projectTypes={['Software Development', 'Design', 'Writng', 'Data Science', 'Illustration', 'Video Production']}
            tags={interests}
            platforms={platforms}
            aboutMe={this.props.user.loggedinUser.bio}
            people={this.state.people}
            title={this.props.projectInfo.title}
            desc={this.props.projectInfo.desc}
            />
        </div>
      </div>
    );
  }
}

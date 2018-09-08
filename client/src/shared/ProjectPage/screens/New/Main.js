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
      people: {},
      communities: []
    }
  }
  componentDidMount() {
    this.loadPeople();
    this.loadCommunities();
  }
  loadPeople() {
    const url = apiLink.users;
    const setApiData = users => {
      const people = users.map(user => {
        const tmp = {};
        tmp[`@${user.username}`] = {picture: user.picture, id: user._id};
        return tmp;
      }).reduce((acc, x) => {
        for (const key in x) acc[key] = x[key];
        return acc;
      }, {});
      this.setState({people: people})
    }
    getApiData(url, setApiData);
  }
  loadCommunities() {
    const url = apiLink.communities;
    const setApiData = communities => {
      const names = communities.map(community => {
        return {
          slug: community.slug,
          name: community.name
        };
      });
      this.setState({communities: names})
    }
    getApiData(url, setApiData);
  }
  render() {
    return (
      <div className="section-white" id="project-form">
        <TopNav route={this.props.route} user={this.props.user.loggedinUser} />
        <div className="container">
          <h4>New Project</h4>
          <ProjectForm
            history={this.props.history}
            user={this.props.user.loggedinUser}
            projectTypes={['Software Development', 'Design', 'Writng', 'Data Science', 'Illustration', 'Video Production']}
            tags={interests}
            platforms={platforms}
            aboutMe={this.props.user.loggedinUser.bio}
            people={this.state.people}
            communities={this.state.communities}
            selectedCommunities={[]}
            selectedInterestAreas={[]}
            actionBtn={{
              label: 'Create Project',
              postUrl: apiLink.projects,
              getProjectData: this.props.actions.getProjectData
            }}
            />
        </div>
      </div>
    );
  }
}

import React from 'react';
import { getApiData } from '../../../lib/helpers';
import { apiLink } from '../../data/apiLinks';
import Projects from '../Collection/Projects/Main';

export default class One extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
  }
  componentDidMount() {
    this.fetchProjects();
  }
  fetchProjects() {
    const url = apiLink.projectsByUserId(this.props.userId);
    const setApiData = data => this.setState({ projects: data });
    getApiData(url, setApiData);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Projects</h3>
          <Projects
            projects={this.state.projects}
            noProjectDisp="This user has no projects."
          />
        </div>
      </div>
    );
  }
}

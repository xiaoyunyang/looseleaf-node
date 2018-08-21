import React from 'react';
import Collection from './Collection';
import { getApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';
import Projects from '../../../components/Collection/Projects';

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
    const setApiData = data => this.setState({ projects: data });
    getApiData(apiLink.projects, setApiData);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Projects</h3>
          <Projects projects={this.state.projects} />
        </div>
      </div>
    );
  }
}

import React from 'react';
import { getApiData } from '../../../lib/helpers';
import { apiLink } from '../../data/apiLinks';
import Cards from '../Collection/Projects/Cards';

export default class One extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      isLoading: true,
      page: 1,
      endOfPage: false
    };
    this.loadMoreProjects = this.loadMoreProjects.bind(this);
  }
  componentDidMount() {
    this.fetchProjects(this.state.page);
  }
  fetchProjects(page) {
    const link = apiLink.projectsByUser(this.props.user._id, this.props.user.projects, page);

    const setApiData = data => {
      const oldProjects = this.state.projects;
      this.setState({
        projects: oldProjects.concat(data),
        isLoading: false
      });

      if (data.length < 5) { // TODO: 5 is a magic number
        this.setState({
          endOfPage: true
        });
      }
    }
    getApiData(link, setApiData);
  }
  loadMoreProjects() {
    const nextPage = this.state.page + 1;
    this.fetchProjects(nextPage);
    this.setState({
      page: nextPage
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Projects</h3>
          <Cards
            projects={this.state.projects}
            isLoading={this.state.isLoading}
            endOfPage={this.state.endOfPage}
            loadMoreProjects={this.loadMoreProjects}
            noProjectDisp={this.props.noProjectDisp}
            context='user'
            userId={this.props.user._id.toString()}
          />
        </div>
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { getApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';
import Card from './Card';

class Main extends React.Component {
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
    const context = this.props.context;
    const findBy = context => {
      switch (context) {
        case 'project': return this.props.projectId;
        case 'community': return this.props.communitySlug;
        case 'user': return this.props.userId;
        default: return;
      }
    };
    const link = apiLink.projectsByContext(context, findBy(context), page);

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
  renderProjects(projects) {
    return (
      <div>
        { projects && projects.length>0 ?
          projects.map(project => {
            return (
              <div className="row" key={`projects-${project.slug}`}>
                <Card project={project} />
              </div>
            );
          })
          :
          <p>{this.props.noProjectDisp}</p>
        }
      </div>
    );
  }
  render() {
    return (
      <div>
        {
          this.state.isLoading ?
          <p>Loading...</p>
          :
          <div>
            { this.renderProjects(this.state.projects) }
          </div>
        }
        {
          this.state.projects.length > 0 && !this.state.endOfPage &&
          <div className="row center">
            <a
              className="btn col s8 m4 l4 offset-s2 offset-m4 offset-l4"
              onClick={this.loadMoreProjects}
            >
              Load More
            </a>
          </div>
        }
      </div>
    );
  }
}

Main.propTypes = {
  projects: PropTypes.array,
  noProjectDisp: PropTypes.string
};
Main.defaultProps = {
  noProjectDisp: 'No projects found.'
}
export default Main;

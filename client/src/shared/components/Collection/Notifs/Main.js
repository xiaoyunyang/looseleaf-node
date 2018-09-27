import React from 'react';
import PropTypes from 'prop-types';
import { getApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';
import Cards from './Cards';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifs: [],
      isLoading: true,
      page: 1,
      endOfPage: false
    };
    this.loadMoreNotifs = this.loadMoreNotifs.bind(this);
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
  render() {
    return (
      <Cards
        projects={this.state.projects}
        isLoading={this.state.isLoading}
        endOfPage={this.state.endOfPage}
        loadMoreProjects={this.loadMoreProjects}
        noProjectDisp={this.props.noProjectDisp}
      />);
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

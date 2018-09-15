import React from 'react';
import TopNav from '../TopNav';
import { communityPage as page }  from '../../data/appPage';
import { getApiData } from '../../../lib/helpers';
import { apiLink } from '../../data/apiLinks';
import Projects from '../../components/Collection/Projects/Main';

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
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="community-page container">
          <div className="row">
            <div id={page(this.props.community.slug).one.slug} className="col s12">
              <h3>{page(this.props.community.slug).one.name}</h3>
              <Projects projects={this.state.projects} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

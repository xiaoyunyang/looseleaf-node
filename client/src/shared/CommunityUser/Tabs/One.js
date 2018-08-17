import React from 'react';
import TopNav from '../TopNav';
import { tabs } from '../routes';
import { getApiData } from '../../../lib/helpers';
import { staticApiLink } from '../../data/apiLinks';
import Projects from '../../components/Collection/Projects';

export default class One extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
  }
  componentDidMount() {
    const setApiData = data => this.setState({ projects: data });
    const apiLink = staticApiLink.projects;
    getApiData(apiLink, setApiData);
  }
  render() {
    return (
      <div>
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="community-page container">
          <div className="row">
            <div id={tabs.one} className="col s12">
              <h3>Projects</h3>
              <Projects projects={this.state.projects} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

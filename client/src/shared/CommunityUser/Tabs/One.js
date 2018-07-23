import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
import { tabs } from '../routes';
import { getApiData } from '../../../lib/helpers';
import { staticApiLink } from '../../data/apiLinks';
import { getAppRoute } from '../../data/appRoutes';

export default class One extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    }
  }
  componentDidMount() {
    const setApiData = data => this.setState({projects: data});
    //const apiLink = 'http://localhost:3001/api/project';
    const apiLink = staticApiLink.projects;
    console.log('apiLink', staticApiLink.projects)
    getApiData(apiLink, setApiData)
  }
  renderProjects(projects) {
    return (
      <div>
        { projects.map((d,i) => {
          return (
            <div className="row" key={i}>
              <div className="col s12 m12 l12">
                <div className="card-panel">
                  <a href={getAppRoute('projectPage')(d.urlSlug)} dangerouslySetInnerHTML={{__html: d.title}} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  }
  render() {
    return (
      <div>
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="container">
          <div id={tabs.one} className="col s12">
            <h3>Projects</h3>
              {
                this.state.projects ? this.renderProjects(this.state.projects) : null
              }
          </div>
        </div>
      </div>
    );

  }
}

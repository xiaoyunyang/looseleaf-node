import React from 'react';
import TopNav from '../TopNav';
import { tabs } from '../routes';
import { getApiData } from '../../../lib/helpers';
import { staticApiLink } from '../../data/apiLinks';
import { getAppRoute } from '../../data/appRoutes';

export default class Three extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    }
  }
  componentDidMount() {
    const setApiData = data => this.setState({users: data});
    //const apiLink = 'http://localhost:3001/api/project';

    const apiLink = staticApiLink.users;
    console.log('api links', apiLink)
    getApiData(apiLink, setApiData)
  }

  renderUsers2(users) {
    return (
      <div>
        { users.map((d,i) => {
          return (
            <div className="row" key={`user-${d.username}`}>
              <div className="col s12 m12 l12">
                <div className="card-panel">
                  <a href={getAppRoute('userPortfolio')(d.username)} dangerouslySetInnerHTML={{__html: d.displayName}} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  }
  renderUsers(users) {
    return (
      <ul id="community-people" className="collection">
        {
          users.map((d,i) => (
            <li key={`user-${d.username}`} className="collection-item avatar">
              <a href={getAppRoute('userPortfolio')(d.username)}>
              <img src={d.picture} alt={d.username} />
              </a>
              <div style={{paddingLeft: 20}}>
                <a href={getAppRoute('userPortfolio')(d.username)}>
                    {d.displayName}
                  </a>
                <p>{d.bio}</p>
              </div>
            </li>
          ))
        }
      </ul>
    );
  }
  render() {
    return (
      <div>
        <TopNav route={this.props.route} community={this.props.community} />
        <div className="container">
          <div id={tabs.three} className="col s12">
            <h3>People</h3>
              {
                this.state.users ? this.renderUsers(this.state.users) : null
              }
          </div>
        </div>
      </div>
    );
  }
}

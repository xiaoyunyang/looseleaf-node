import React from 'react';
import TopNav from '../TopNav';
import { tabs } from '../routes';
import { getApiData } from '../../../lib/helpers';
import { staticApiLink } from '../../data/apiLinks';
import { getAppRoute } from '../../data/appRoutes';
import UsersCollections from '../../components/Collection/Users';

export default class Three extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }
  componentDidMount() {
    const setApiData = data => this.setState({ users: data });
    const apiLink = staticApiLink.users;
    getApiData(apiLink, setApiData);
  }

  renderUsers2(users) {
    return (
      <div>
        { users.map((d) => {
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
  render() {
    return (
      <div>
        <TopNav route={this.props.route} community={this.props.community} />
        <div className="container">
          <div className="row">
            <div id={tabs.three} className="col s12">
              <h3>People</h3>
              <UsersCollections users={this.state.users} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

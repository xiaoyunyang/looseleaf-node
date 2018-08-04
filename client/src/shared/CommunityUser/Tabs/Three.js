import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
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
    // const apiLink = 'http://localhost:3001/api/project';

    const apiLink = staticApiLink.users;
    console.log('api links', apiLink);
    getApiData(apiLink, setApiData);
  }
  renderUsers(users) {
    return (
      <div>
        { users.map((d, i) => {
          console.log(d);
          return (
            <div className="row" key={i}>
              <div className="col s12 m12 l12">
                <div className="card-panel">
                  <a href={getAppRoute('userPortfolio')(d.username)} dangerouslySetInnerHTML={{ __html: d.displayName }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    return (
      <div>
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="container">
          <div id={tabs.three} className="col s12">
            <h3>People</h3>
            <UsersCollections users={this.state.users} />
          </div>
        </div>
      </div>
    );
  }
}

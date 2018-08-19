import React from 'react';
import TopNav from '../TopNav';
import { page } from '../routes';
import { getApiData } from '../../../lib/helpers';
import { apiLink } from '../../data/apiLinks';
import appRoute from '../../data/appRoute';
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
    getApiData(apiLink.users, setApiData);
  }

  renderUsers2(users) {
    return (
      <div>
        { users.map((d) => {
          return (
            <div className="row" key={`user-${d.username}`}>
              <div className="col s12 m12 l12">
                <div className="card-panel">
                  <a href={appRoute('userPortfolio')(d.username)} dangerouslySetInnerHTML={{__html: d.displayName}} />
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
      <div className="section-white">
        <TopNav route={this.props.route} community={this.props.community} />
        <div className="container">
          <div className="row">
            <div id={page(this.props.community).three.slug} className="col s12">
              <h3>People</h3>
              <UsersCollections users={this.state.users} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

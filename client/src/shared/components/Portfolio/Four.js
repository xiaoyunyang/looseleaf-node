import React from 'react';
import { getApiData } from '../../../lib/helpers';
import { apiLink } from '../../data/apiLinks';
import Users from '../Collection/Users';

export default class Three extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.fetchUsers(this.props.user.following);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.following !== this.props.user.following) {
      this.fetchUsers(nextProps.user.following)
    }
  }
  fetchUsers(following) {
    if (following.length === 0) {
      this.setState({ users: []})
    } else {
      const setApiData = data => this.setState({ users: data });
      const url = apiLink.usersByIds(following);
      getApiData(url, setApiData);
    }
  }
  updateState() {
    this.props.actions.getUserProfileData(
      this.props.user.username,
      this.props.loggedinAs.username
    );
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Following</h3>
          {
            this.state.users.length > 0 ?
              <Users
                users={this.state.users}
                loggedinAs={this.props.loggedinAs}
                updateState={this.updateState.bind(this)}
              />
              :
              <p>Not following anyone.</p>
          }
        </div>
      </div>
    );
  }
}

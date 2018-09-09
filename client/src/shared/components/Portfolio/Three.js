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
    this.fetchUsers(this.props.user.followers);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.followers !== this.props.followers) {
      this.fetchUsers(nextProps.user.followers)
    }
  }
  fetchUsers(followers) {
     if (followers.length > 0) {
      const setApiData = data => this.setState({ users: data });
      const url = apiLink.usersByIds(followers);
      getApiData(url, setApiData);
    }
  }
  updateState() {
    this.props.actions.getUserProfileData(this.props.user.username, this.props.loggedinAs.username);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Followers</h3>
            {
              this.state.users.length > 0 ?
                <Users
                  users={this.state.users}
                  loggedinAs={this.props.loggedinAs}
                  updateState={this.updateState.bind(this)}
                />
                :
                <p>No followers.</p>
            }
        </div>
      </div>
    );
  }
}

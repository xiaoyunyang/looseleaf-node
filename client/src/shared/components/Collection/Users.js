import React from 'react';
import PropTypes from 'prop-types';
import appRoute from '../../data/appRoute';
import { apiLink } from '../../data/apiLinks';
import { dateFormatted, postToApiData } from '../../../lib/helpers';

class Users extends React.Component {
  handleFollowBtnClick(userToFollow, action) {
    const url = apiLink.userFollowing(this.props.loggedinAs);
    const data = {formFields: {userId: userToFollow, action: action}};
    const cbFailure = () => {};

    const cbSuccess = () =>  {
      this.props.updateState();
      // TODO: Do I really need to updateLoggedinUser again?
      this.props.updateLoggedinUser(this.props.loggedinUsername)
    }
    postToApiData(url, data, cbFailure, cbSuccess);
  }
  renderFollowBtn(userId, followers) {
    if (followers.includes(this.props.loggedinAs)) {
      return <button
        className="btn secondary-content"
        onClick={this.handleFollowBtnClick.bind(this, userId, 'unfollow')}
        >
        Unfollow
      </button>
    }
    return <button
      className="btn secondary-content"
      onClick={this.handleFollowBtnClick.bind(this, userId, 'follow')}>
      Follow
    </button>
  }
  render() {
    return (
      <ul id="community-people" className="collection">
        { this.props.users &&
          this.props.users.map(user => (
            <li key={`user-${user.username}`} className="collection-item avatar">
              <a href={appRoute('userProfile')(user.username)}>
                <img src={user.picture} alt={user.username} />
              </a>
              <div style={{ paddingLeft: 20, paddingRight: 150 }}>
                <a href={appRoute('userProfile')(user.username)}>
                {user.displayName}
                </a>
                <p style={{fontSize: 14, fontWeight: 300, paddingBottom: 10}}>
                  {`Last Logged in ${dateFormatted(user.lastLoggedIn)}`}
                </p>
                <p>{user.bio}</p>
                {
                  this.props.loggedinAs !== user._id.toString() &&
                  this.renderFollowBtn(user._id, user.followers)
                }
              </div>
            </li>
          ))
        }
      </ul>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array,
  loggedinAs: PropTypes.string
};
Users.defaultProps = {
  loggedinAs: ''
}

export default Users;

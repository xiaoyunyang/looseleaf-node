import React from 'react';
import PropTypes from 'prop-types';
import appRoute from '../../data/appRoute';
import { apiLink } from '../../data/apiLinks';
import { dateFormatted, postToApiData } from '../../../lib/helpers';

class Users extends React.Component {
  handleFollowBtnClick(userToFollow, action) {
    const url = apiLink.userFollowing(this.props.loggedinAs._id);
    const data = {formFields: {userId: userToFollow, action: action}};
    const cbFailure = () => {};

    const cbSuccess = (status, msg) =>  {
      this.props.updateState();
      // TODO: Do I really need to updateLoggedinUser again?
    }
    postToApiData(url, data, cbFailure, cbSuccess);
  }
  renderFollowBtn(userId, followers) {
    if(!this.props.loggedinAs || this.props.loggedinAs._id.toString() === userId.toString()) {
      return null;
    }
    if (followers.includes(this.props.loggedinAs._id)) {
      return <button
        className="btn"
        onClick={this.handleFollowBtnClick.bind(this, userId, 'unfollow')}
        >
        Unfollow
      </button>
    }
    return <button
      className="btn"
      onClick={this.handleFollowBtnClick.bind(this, userId, 'follow')}>
      Follow
    </button>
  }
  render() {
    const imgStyle = this.props.showBio ? {} : {width: 40, height:40};
    const userInfoStyle = this.props.showBio ? {} : {marginLeft: -30};
    const collectionItemStyle = this.props.showBio ? {} : {minHeight: 65};
    return (
      <ul id="community-people" className="collection">
        { this.props.users &&
          this.props.users.map(user => (
            <li key={`user-${user.username}`} className="collection-item avatar" style={collectionItemStyle}>
              <a href={appRoute('userProfile', true)(user.username)}>
                <img
                  style={imgStyle}
                  src={user.picture}
                  alt={user.username}
                />
              </a>
              <div className="user-info" style={userInfoStyle}>
                <a href={appRoute('userProfile', true)(user.username)}>
                {user.displayName}
                </a>
                <p style={{fontSize: 14, fontWeight: 300, paddingBottom: 10}}>
                  {`Last Logged in ${dateFormatted(user.lastLoggedIn)}`}
                </p>
                { this.props.showBio && <p>{user.bio}</p> }
                <div className="hide-on-small-only secondary-content">
                  {
                    this.renderFollowBtn(user._id, user.followers)
                  }
                </div>
                <div className="hide-on-med-and-up" style={{paddingTop: 20, paddingBottom: 20}}>
                  {
                    this.renderFollowBtn(user._id, user.followers)
                  }
                </div>
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
  loggedinAs: PropTypes.object,
  showBio: PropTypes.bool
};
Users.defaultProps = {
  loggedinAs: null,
  showBio: true
}

export default Users;

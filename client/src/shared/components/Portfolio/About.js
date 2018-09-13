import React from 'react';
import { Link } from 'react-router-dom';
import appRoute from '../../data/appRoute';
import Communities from '../Collection/Communities';
import { apiLink } from '../../data/apiLinks';
import { postToApiData } from '../../../lib/helpers';
import { image } from '../../data/assetLinks';

const getMonthYear = (dateString) => {
  // dateStr looks like 'Fri Apr 06 2018'
  const dateArr = new Date(dateString).toDateString().split(' ');
  const month = dateArr[1];
  const year = dateArr[3];
  return `${month} ${year}`;
};

const iconEnums = {
  bio: 'create',
  create: 'bio',
  location: 'location_on',
  location_on: 'location',
  email: 'email',
  website: 'public',
  public: 'website',
  communities: 'group',
  group: 'communities'
};

const TextOrLink = ({ iconName, content }) => (
  <div>
    {
      iconEnums[iconName] === 'email' ?
        <a href={`mailto: ${content}`}>{content}</a>
        :
        null
    }
    {
      iconEnums[iconName] === 'website' ?
        <a href={`${content}`} target="_blank">
          {content} <i className="fa fa-external-link"></i>
        </a>
        :
        null
    }
    {
      (iconEnums[iconName] === 'bio' || iconEnums[iconName] === 'location') ?
        <p>{content}</p>
        :
        null
    }
  </div>
);

const UserInfo = ({ icon, info, orElse, to, isLoggedinUser }) => (
  <div>
  {
    isLoggedinUser &&
    <div className="row portfolio-user-info">
      <div className="col s1 m1 l1">
        <i className="material-icons">{icon}</i>
      </div>
      <div className="col s11 m11 l11">
        { info ?
          <TextOrLink iconName={icon} content={info} />
          :
          <Link to={to}>{orElse}</Link>
        }
      </div>
    </div>
    }
    {
      !isLoggedinUser && info &&
      <div className="row portfolio-user-info">
        <div className="col s1 m1 l1">
          <i className="material-icons">{icon}</i>
        </div>
        <div className="col s11 m11 l11">
          <TextOrLink iconName={icon} content={info} />
        </div>
      </div>
    }
  </div>

);
class About extends React.Component {
  handleFollowBtnClick(loggedinUserId, userToFollowId, action) {

    // NOTE: the user who is doing the following isthe loggedinUser
    const url = apiLink.userFollowing(loggedinUserId);

    const data = {formFields: {userId: userToFollowId, action: action}};
    const cbFailure = () => {};

    const cbSuccess = (status, msg) =>  {
      this.props.updateState();
      // TODO: Do I really need to updateLoggedinUser again?
    }
    postToApiData(url, data, cbFailure, cbSuccess);
  }
  renderFollowBtn(loggedinUserId, currUserFollowers) {
    if (currUserFollowers.includes(loggedinUserId)) {
      return (
        <div className="center" style={{paddingTop: 10}}>
          <button
            className="btn"
            style={{paddingLeft: 15, paddingRight: 15}}
            onClick={this.handleFollowBtnClick.bind(this, loggedinUserId, this.props.user._id, 'unfollow')}
          >
            Unfollow
          </button>
        </div>
      );
    }
    // TODO: Put the style stuff into the css file.
    return (
      <div className="center" style={{paddingTop: 10}}>
        <button
          className="btn"
          style={{paddingLeft: 15, paddingRight: 15}}
          onClick={this.handleFollowBtnClick.bind(this, loggedinUserId, this.props.user._id, 'follow')}
        >
          Follow
        </button>
      </div>
    );
  }
  render() {
    const isLoggedinUser= this.props.loggedinUser &&
      this.props.user._id === this.props.loggedinUser._id;

    return (
      <div className="hero-profile" style={{paddingBottom: 20}}>
        <div className="row">
          <div className="col s12 m12 l3">
            <img
              src={this.props.user.picture ? this.props.user.picture : image.defaultUser}
              alt="" className="circle"
            />
            {
              this.props.loggedinUser && isLoggedinUser &&
              <div className="center">
                <Link to={appRoute('userSettings')(this.props.user.username)}>
                  Edit Profile
                </Link>
              </div>
            }
            {
              this.props.loggedinUser && !isLoggedinUser &&
              this.renderFollowBtn(this.props.loggedinUser._id, this.props.user.followers)
            }
          </div>
          <div className="col s12 m12 l9 hero-info">
            <div className="hero-profile-center">
              <span><h4>{this.props.user.displayName}</h4></span>
              <p>{`@${this.props.user.username}`}</p>
              <p>{`Member since ${getMonthYear(this.props.user.createdAt)}`}</p>
            </div>
            <Communities
              icon="group"
              cs={this.props.user.communities}
              altern={<a href={appRoute('exploreCommunities')}>Join a community</a>}
              isLoggedinUser={isLoggedinUser}
              hasIcon
            />
            <UserInfo icon={iconEnums.location}
              info={this.props.user.location}
              orElse="add location"
              isLoggedinUser={isLoggedinUser}
              to={appRoute('userSettings')(this.props.user.username)}
            />
            <UserInfo icon={iconEnums.bio}
              info={this.props.user.bio}
              orElse="add bio"
              isLoggedinUser={isLoggedinUser}
              to={appRoute('userSettings')(this.props.user.username)}
            />
            <UserInfo icon={iconEnums.website}
              info={this.props.user.website}
              orElse="add website"
              isLoggedinUser={isLoggedinUser}
              to={appRoute('userSettings')(this.props.user.username)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default About;

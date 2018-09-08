import React from 'react';
import { Link } from 'react-router-dom';
import appRoute from '../../data/appRoute';
import Communities from '../Collection/Communities';

const defaultUserPic = 'http://marketline.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';

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

const UserInfo = ({ icon, info, orElse, to }) => (
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
);


export default ({ user, isLoggedinUser }) => (
  <div className="hero-profile">
    <div className="row">
      <div className="col s12 m12 l3">
        <img src={user.picture ? user.picture : defaultUserPic} alt="" className="circle" />
        {
          isLoggedinUser &&
          <div className="center">
            <Link to={appRoute('userSettings')(user.username)}>
              Edit Profile
            </Link>
          </div>
        }
      </div>
      <div className="col s12 m12 l9 hero-info">
        <div className="hero-profile-center">
          <span><h4>{user.displayName}</h4></span>
          <p>{`@${user.username}`}</p>
          <p>{`Member since ${getMonthYear(user.createdAt)}`}</p>
        </div>
        <Communities
          icon="group"
          cs={user.communities}
          altern={<a href={appRoute('exploreCommunities')}>Join a community</a>}
        />
        <UserInfo icon={iconEnums.location}
          info={user.location}
          orElse="add location"
          to={appRoute('userSettings')(user.username)}
        />
        <UserInfo icon={iconEnums.bio}
          info={user.bio}
          orElse="add bio"
          to={appRoute('userSettings')(user.username)}
        />
        <UserInfo icon={iconEnums.website}
          info={user.website}
          orElse="add website"
          to={appRoute('userSettings')(user.username)}
        />
      </div>
    </div>
  </div>
);

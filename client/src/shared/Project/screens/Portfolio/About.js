import React from 'react';
import { Link } from 'react-router-dom';
import { getNav } from '../../routes';

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
}

const TextOrLink = ({iconName, content}) => (
  <div>
{      console.log('pooop', iconName)}
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
)


const UserInfo = ({icon, info, orElse, to}) => (
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
)
const Communities= ({icon, cs}) => (
  <div className="row portfolio-user-info">
    <div className="col s1 m1 l1">
      <i className="material-icons">{icon}</i>
    </div>
    <div className="col s11 m11 l11">
      {
        cs.map((c, i) => {
        return <div key={i} className="chip"><a href={c.url}>{c.name}</a></div>
        })
      }
    </div>
  </div>
)

const cs = [
  {name: 'Web Developer', url: ''},
  {name: 'Mobile Developer', url: ''},
  {name: 'Graphic Designer', url: ''},
  {name: 'Entrepreneur', url: ''},
]

export default ({ user }) => (
  <div className="hero-profile">
    <div className="row">
      <div className="col s12 m12 l3">
        <img src={user.picture} alt="" className="circle" />
      </div>
      <div className="col s12 m12 l9 hero-info">
        <div className="hero-profile-center">
          <h4>{user.displayName}</h4>
            <p>
              {`@${user.username}`}
            </p>
        </div>
        <Communities icon={'group'} cs={cs} />
        <UserInfo icon={iconEnums.location}
          info={user.location}
          orElse={'add location'}
          to={getNav(user.username).settings}
          />
        <UserInfo icon={iconEnums.bio}
          info={user.bio}
          orElse={'add bio'}
          to={getNav(user.username).settings}
          />
        <UserInfo icon={iconEnums.email}
          info={user.email}
          orElse={'add email'}
          to={getNav(user.username).settings}
        />
      <UserInfo icon={iconEnums.website}
          info={user.website}
          orElse={'add website'}
          to={getNav(user.username).settings}
        />
      </div>
    </div>
  </div>
);

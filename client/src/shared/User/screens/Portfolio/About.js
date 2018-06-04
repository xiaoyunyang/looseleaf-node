import React from 'react';
import { Link } from 'react-router-dom';
import { getNav } from '../../routes';

const UserInfo = ({icon, info, orElse, to}) => (
  <div className="row portfolio-user-info">
    <div className="col s1 m1 l1">
      <i class="material-icons">{icon}</i>
    </div>
    <div className="col s11 m11 l11">
      { info ?
        <p>{info}</p>
        :
        <Link to={to}>{orElse}</Link>
      }
    </div>
  </div>
)
const Communities= ({icon, cs}) => (
  <div className="row portfolio-user-info">
    <div className="col s1 m1 l1">
      <i class="material-icons">{icon}</i>
    </div>
    <div className="col s11 m11 l11">
      {
        cs.map((c) => {
        return <div className="chip"><a href={c.url}>{c.name}</a></div>
        })
      }
    </div>
  </div>
)

const cs = [
  {name: 'Web Developer', url: ''},
  {name: 'Mobile Developer', url: ''},
  {name: 'Graphic Desiger', url: ''},
  {name: 'Entrepreneur', url: ''},
]

export default ({ user }) => (
  <div className="hero-profile">
    <div className="row">
      <div className="col s12 m6 l3">
        <img src={user.picture} alt="" className="circle" />
      </div>
      <div className="col s12 m6 l9 hero-info">
        <h4>{user.displayName}</h4>
        <p>{`@${user.username} | Member since ${user.createdAt}`}</p>
        {
          <Communities icon={'group'} cs={cs} />
        }
        {
          <UserInfo icon={'location_on'}
            info={user.location}
            orElse={'add location'}
            to={getNav(user.username).settings}
            />
        }
        {
          <UserInfo icon={'create'}
            info={user.bio}
            orElse={'add bio'}
            to={getNav(user.username).settings}
            />
        }
        {
          <UserInfo icon={'email'}
            info={user.email}
            orElse={'add email'}
            to={getNav(user.username).settings}
            />
        }
        {
          <UserInfo icon={'public'}
            info={user.website}
            orElse={'add website'}
            to={getNav(user.username).settings}
            />
        }
      </div>
    </div>
  </div>
);

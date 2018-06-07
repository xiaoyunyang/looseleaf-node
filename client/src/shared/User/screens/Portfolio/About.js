import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { getNav } from '../../routes';

const UserInfo = ({icon, info, orElse, to}) => (
  <div className="row portfolio-user-info">
    <div className="col s1 m1 l1">
      <i className="material-icons">{icon}</i>
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
            <p>
              {`Member since ${moment(user.createdAt).format('MMM YYYY')}`}
            </p>
        </div>
        <Communities icon={'group'} cs={cs} />
        <UserInfo icon={'location_on'}
          info={user.location}
          orElse={'add location'}
          to={getNav(user.username).settings}
          />
        <UserInfo icon={'create'}
          info={user.bio}
          orElse={'add bio'}
          to={getNav(user.username).settings}
          />
        <UserInfo icon={'email'}
          info={user.email}
          orElse={'add email'}
          to={getNav(user.username).settings}
        />
        <UserInfo icon={'public'}
          info={user.website}
          orElse={'add website'}
          to={getNav(user.username).settings}
        />
      </div>
    </div>
  </div>
);

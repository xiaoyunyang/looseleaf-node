import React from 'react';
import { Link } from 'react-router-dom';
import { getNav } from '../../routes';

export default ({ user }) => (
  <div className="hero-profile">
    <div className="row center">
      <div className="col l4 m6 s12">
        <img src={user.picture} alt="" className="circle" />
      </div>
      <div className="col l8 m6 s12 hero-info">
        <h3>{user.displayName}</h3>
        <p>Web Developer | {`Member since ${user.createdAt}`}</p>
        {
          user.bio ?
            <p>{`Bio ${user.bio}`}</p>
            :
            <Link to={getNav(user.username).settings}>add bio</Link>
        }
        <p>{`email: ${user.email}`}</p>
        {
          user.location ?
            <p>{`location: ${user.location}`}</p>
            :
            <Link to={getNav(user.username).settings}>add location</Link>
        }
        {
          user.website ? <p>{`Website ${user.website}`}</p> : <a>add website</a>
        }
      </div>
    </div>
  </div>
);

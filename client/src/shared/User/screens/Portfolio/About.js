import React from 'react';

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
          user.bio ? <p>{`Bio ${user.bio}`}</p> : <a>add bio</a>
        }
        <p>{`email: ${user.email}`}</p>
        {
          user.location ? <p>{`location: ${user.location}`}</p> : <a>add Location</a>
        }
        {
          user.website ? <p>{`Website ${user.website}`}</p> : <a>add website</a>
        }
      </div>
    </div>
  </div>
);

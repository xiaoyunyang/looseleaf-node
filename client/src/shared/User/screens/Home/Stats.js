import React from 'react';

const Stat = ({ num, phrase }) => (
  <div className="row">
    <div className="col s2 m2 l2">
      <h6>{num}</h6>
    </div>
    <div className="col s10 m10 l10" style={{marginTop: -3}}>
      <p>{phrase}</p>
    </div>
  </div>
);

const Stats = ({ user }) => (
  <div className="card-panel hide-on-small-only" id="user-card">
    <div className="row center-align">
      <div className="col s4 m6 l6 offset-m3 offset-l3">
        <img className="circle" src={user.picture} alt=""/>
      </div>
      <div className="col s8 m12 l12">
        {
          user.displayName &&
          <h6 className="truncate" style={{lineHeight: 1, marginBottom: -13}}>
            {user.displayName}
          </h6>
        }
        <p className="truncate" style={{lineHeight: 1.3}}>{`@${user.username}`}</p>
      </div>
    </div>
    <div className="or-divider"/>
    <Stat num={user.projects.length} phrase={'projects'}/>
    <Stat num={user.followers.length} phrase={'followers'}/>
    <Stat num={user.following.length} phrase={'following'}/>
  </div>
);

export default Stats;

import React from 'react';
import PropTypes from 'prop-types';
import appRoute from '../../data/appRoute';

const Users = ({ users }) => (
  <ul id="community-people" className="collection">
    { users &&
      users.map(d => (
        <li key={`user-${d.username}`} className="collection-item avatar">
          <a href={appRoute('userProfile')(d.username)}>
            <img src={d.picture} alt={d.username} />
          </a>
          <div style={{ paddingLeft: 20 }}>
            <a href={appRoute('userProfile')(d.username)}>
              {d.displayName}
            </a>
            <p>{d.bio}</p>
          </div>
        </li>
      ))
    }
  </ul>
);
Users.propTypes = {
  users: PropTypes.array
};

export default Users;

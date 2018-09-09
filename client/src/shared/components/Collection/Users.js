import React from 'react';
import PropTypes from 'prop-types';
import appRoute from '../../data/appRoute';
import { dateFormatted } from '../../../lib/helpers';

const Users = ({ users }) => (
  <ul id="community-people" className="collection">
    { users &&
      users.map(user => (
        <li key={`user-${user.username}`} className="collection-item avatar">
          <a href={appRoute('userProfile')(user.username)}>
            <img src={user.picture} alt={user.username} />
          </a>
          <div style={{ paddingLeft: 20, paddingRight: 150 }}>
            <a href={appRoute('userProfile')(user.username)}>
            {user.displayName}
            </a>
            <p style={{fontSize: 14, fontWeight: 300, paddingBottom: 10}}>
              {`Last Logged in ${dateFormatted(user.lastLoggedIn)}`}
            </p>
            <p>{user.bio}</p>
            <button className="btn secondary-content" href="#!">Follow</button>
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

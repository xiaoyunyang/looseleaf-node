import React from 'react';
import PropTypes from 'prop-types';

import { getAppRoute } from '../../data/appRoutes';

const Users = ({ users }) => (
  <ul id="community-people" className="collection">
    { users ?
      users.map(d => (
        <li key={`user-${d.username}`} className="collection-item avatar">
          <a href={getAppRoute('userPortfolio')(d.username)}>
            <img src={d.picture} alt={d.username} />
          </a>
          <div style={{ paddingLeft: 20 }}>
            <a href={getAppRoute('userPortfolio')(d.username)}>
              {d.displayName}
            </a>
            <p>{d.bio}</p>
          </div>
        </li>
      ))
     :
    null
    }
  </ul>
);
Users.propTypes = {
  users: PropTypes.object.isRequired
};

export default Users;

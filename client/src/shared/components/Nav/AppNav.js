import React from 'react';
import PropTypes from 'prop-types';
import NavLink from './NavLink';
import { userPage } from '../../data/appPage';

// valid pageName include: ['home', 'profile', 'newProject', 'userSettings']
const UserAppNav = ({ pageName, username, external, id }) => (
  <NavLink id={id} to={userPage(username)[pageName].link} name={userPage(username)[pageName].name} external={external}/>
);

export { UserAppNav };

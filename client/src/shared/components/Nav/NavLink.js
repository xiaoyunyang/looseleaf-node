import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavLink = ({external, to, className, id, name}) => (
  external ?
    <a id={id} className={className} href={to}>{name}</a>
    :
    <Link d={id} className={className} to={to}>{name}</Link>
);

export default NavLink;

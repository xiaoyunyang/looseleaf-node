import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { UserAppNav } from '../Nav/AppNav';

class UserDropdown extends React.Component {
  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      stopPropagation: false // Stops event propagation
    });
  }
  render() {
    const { username } = this.props;
    return (
      <li className="dropdown-block">
        <a className="dropdown-button" data-activates="new-dropdown">
           <i className="material-icons">add</i>
          <div className="arrow-down" style={{left: -15, top: 5}}/>
        </a>
        <ul id="new-dropdown" className="dropdown-content topnav-dropdown">
          <li><UserAppNav pageName='newProject' username={username} external={true}/></li>
          <div className="popover-arrow" />
        </ul>
      </li>
    );
  }
}

UserDropdown.propTypes = {
  username: PropTypes.string,
  userPic: PropTypes.string, // url
  useExternLinks: PropTypes.bool, //this determines if <a/>  (if true) or <Link /> (if false) is rendered.
  redirPath: PropTypes.string //redirect for log out.
};

UserDropdown.defaultProps = {
  useExternLinks: true,
  redirPath: '/'
};

export default UserDropdown;

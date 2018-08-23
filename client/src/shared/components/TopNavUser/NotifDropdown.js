import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class NotifDropdown extends React.Component {
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
    return (
      <li className="dropdown-block">
        <a className="dropdown-button" data-activates="notif-dropdown">
          <i className="material-icons">notifications_none</i>
        </a>
        <ul id="notif-dropdown" className="dropdown-content topnav-dropdown">
          {
            <li>
              <p>Stuff</p>
            </li>
          }
          <div className="popover-arrow"></div>
        </ul>
      </li>
    )
  }
}

export default NotifDropdown;

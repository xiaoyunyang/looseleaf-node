import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class CommunityDropdown extends React.Component {
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
        <a className="dropdown-button" data-activates="community-dropdown">
          Communities
        </a>
        <ul id="community-dropdown" className="dropdown-content topnav-dropdown">
          { this.props.communities.length === 0 ?
            <li>
              <a href='/community/explore'>Join One</a>
            </li>
            :
            this.props.communities.map(d =>  (
                <li key={`community-link-${d.name}`}>
                  <a href={d.link}>{d.name}</a>
                </li>
              )
            )
          }
          <div className="popover-arrow"></div>
        </ul>
      </li>
    )
  }
}

export default CommunityDropdown;

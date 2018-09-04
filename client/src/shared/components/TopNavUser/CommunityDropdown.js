import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import appRoute from '../../data/appRoute';

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
              <a href={appRoute('exploreCommunities')}>Join One</a>
            </li>
            :
            this.props.communities.map(c => (
              <li key={`community-dropdown-${c}`}>
                <a href={`/community/${c}`}>{c}</a>
              </li>
              ))
          }
          <div className="popover-arrow" />
        </ul>
      </li>
    );
  }
}

CommunityDropdown.propTypes = {
  communities: PropTypes.array
};
CommunityDropdown.defaultProps = {
  communities: []
}

export default CommunityDropdown;

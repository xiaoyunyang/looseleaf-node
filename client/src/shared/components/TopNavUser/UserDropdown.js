import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import NavLink from '../Nav/NavLink';
import { UserAppNav } from '../Nav/AppNav';
import { apiLink } from '../../data/apiLinks';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientModeOn: false
    }
  }
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
    this.setState({
      clientModeOn: true
    })
  }
  render() {
    const { username, userPic, useExternLinks, redirPath } = this.props;
    return (
      <li className="dropdown-block">
        <a className="navbar-img dropdown-button" data-activates="user-dropdown">
          <img alt={`looseleaf user ${username}`} className="mod-round" src={userPic} />
          {
            // <div className="arrow-down" />
          }
        </a>
        <ul id="user-dropdown" className="dropdown-content topnav-dropdown">
          <li><UserAppNav pageName='profile' username={username} external={useExternLinks}/></li>
          <li><UserAppNav pageName='newProject' username={username} external={useExternLinks}/></li>
          <li className="divider" />
          <li><a href="/community">Communities</a></li>
          <li><UserAppNav pageName='userSettings' username={username} external={useExternLinks}/></li>
          <li>
            {
              this.state.clientModeOn ?
                <NavLink to={`${apiLink.logout}?redirPath=${redirPath}`} name='Log out' external={true}/>
                :
                null
            }
          </li>
          <div className="popover-arrow"></div>
        </ul>
      </li>
    )
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

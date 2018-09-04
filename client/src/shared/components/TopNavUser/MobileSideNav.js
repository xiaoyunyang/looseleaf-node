import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import NavLink from '../Nav/NavLink';
import { UserAppNav } from '../Nav/AppNav';
import { apiLink } from '../../data/apiLinks';

class MobileSideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientModeOn: false
    }
  }
  componentDidMount() {
    this.setState({
      clientModeOn: true
    });
    $('.button-collapse').sideNav({
      edge: 'right',
      closeOnClick: true
    });
  }
  render() {
    const { username, userPic, userWebsite, userEmail, useExternLinks, redirPath } = this.props;
    return (
      <ul id="mobile-menu" className="side-nav">
        <li>
          <div className="user-view">
            <img alt={`looseleaf user ${username}`} className="circle" src={userPic} />
            <div className="row">
              <div className="col l2 m2 s2">
                <a href={`mailto:${userEmail}`}><i className="fa fa-envelope fa-lg" /></a>
              </div>
              {
                userWebsite &&
                <div className="col l2 m2 s2">
                  <a target="_blank" href={userWebsite} rel="noopener noreferrer">
                    <i className="fa fa-globe-americas fa-lg" />
                  </a>
                </div>
              }
            </div>
          </div>
        </li>
        <li><UserAppNav pageName='home' username={username} external={useExternLinks}/></li>
        <li><UserAppNav pageName = 'profile' username={username} external={useExternLinks}/></li>
        <li><UserAppNav pageName='newProject' username={username} external={useExternLinks}/></li>
        <li className="divider" />
        <li><UserAppNav pageName='userSettings' username={username} external={useExternLinks}/></li>
        <li>
          {
            this.state.clientModeOn ?
              <NavLink to={`${apiLink.logout}?redirPath=${redirPath}`} name='Log out' external={true}/>
              :
              null
          }
        </li>
      </ul>
    );
  }
}
MobileSideNav.propTypes = {
  username: PropTypes.string,
  userEmail: PropTypes.string,
  userPic: PropTypes.string, // url
  userWebsite: PropTypes.string, // url
  useExternLinks: PropTypes.bool, //this determines if <a/>  (if true) or <Link /> (if false) is rendered.
  redirPath: PropTypes.string //redirect for log out.
};
MobileSideNav.defaultProps = {
  useExternLinks: true,
  redirPath: '/'
};
export default MobileSideNav;

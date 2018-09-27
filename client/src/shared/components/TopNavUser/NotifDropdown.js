import React from 'react';
// import PropTypes from 'prop-types';
import $ from 'jquery';
import { postToApiData } from '../../../lib/helpers';
import appRoute from '../../data/appRoute';
import { apiLink } from '../../data/apiLinks';
import Notif from '../Collection/Notifs/Notif';

class NotifDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifs: this.props.notifs
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
  }
  renderNotifs(notifs) {
    if (notifs.length === 0) {
      return <li><p className="center-align">No Notification</p></li>
    }
    return notifs.map(notif =>
      <div key={`notif-${notif._id}`}>
        <li>
          <Notif notif={notif} />
        </li>
      </div>
    );
  }
  handleNotifIconClick(notifs) {
    if(notifs.length === 0) return;
    const link = apiLink.userReadAlNotifs(notifs[0].toUser);
    const data = ''; // data does not matter
    const cbFailure = () => {};
    const cbSuccess = () => {
      this.props.markAllNotifsAsRead();
    }
    postToApiData(link, data, cbFailure, cbSuccess);
  }
  renderNotifIcon(notifs) {
    if(notifs.length === 0 || notifs[0].read === true) {
      return <i style={{paddingLeft: 10}} className="material-icons">notifications_none</i>;
    }
    const numUnread = notifs.filter(notif => notif.read === false).length;

    return (
      <div className="circle-with-text" style={{marginTop: 10, marginRight: -6}}>
        {numUnread}
      </div>
    );
  }
  render() {
    return (
      <li className="dropdown-block">
        <a
          className="dropdown-button"
          data-activates="notif-dropdown"
          onClick={this.handleNotifIconClick.bind(this, this.props.notifs)}
        >
          {this.renderNotifIcon(this.props.notifs)}
        </a>
        <ul id="notif-dropdown" className="notif-collection dropdown-content topnav-dropdown">
          {
            this.renderNotifs(this.props.notifs)
          }
          {
            this.props.notifs.length > 0 &&
            <li><a href={appRoute('userNotif', true)} className="center-align">See All</a></li>
          }
          <div className="popover-arrow"></div>
        </ul>
      </li>
    );
  }
}

export default NotifDropdown;

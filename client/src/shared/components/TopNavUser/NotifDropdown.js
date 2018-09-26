import React from 'react';
// import PropTypes from 'prop-types';
import $ from 'jquery';
import { dateFormatted, getApiData } from '../../../lib/helpers';
import appRoute from '../../data/appRoute';
import { apiLink } from '../../data/apiLinks';
import { image } from '../../data/assetLinks';

const notifObject = {
  STARTED_FOLLOWING: {
    name: 'STARTED_FOLLOWING',
    getMsg: fromUserDisplayName => `${fromUserDisplayName} started following you`,
    getLink: username => appRoute('userProfile', true)(username)
  },
  INVITED_TO_PROJECT: {
    name: 'INVITED_TO_PROJECT',
    getMsg: (fromUserDisplayName, projectName) => `${fromUserDisplayName} invited you to contribute to ${projectName}`,
    getLink: projectSlug => appRoute('projectPage', true)(projectSlug)
  },
  STARTED_CONTRIBUTE_TO_PROJECT: {
    name: 'STARTED_CONTRIBUTE_TO_PROJECT',
    getMsg: (fromUserDisplayName, projectName) => `${fromUserDisplayName} started contributing to ${projectName}`,
    getLink: projectSlug => appRoute('projectPage', true)(projectSlug)
  },
  RESPONDED_TO_POST: {
    name: 'RESPONDED_TO_POST',
    getMsg: fromUserDisplayName => `${fromUserDisplayName} responded to your post`,
    getLink: postId => appRoute('postPage', true)(postId)
  }
}

class Notif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        picture: image.defaultUser,
        displayName: 'firstname lastname'
      }
    }
  }
  componentDidMount() {
    this.fetchUser(this.props.notif.fromUser);
  }
  fetchUser(userId) {
    const link = apiLink.userById(userId);
    const setApiData = data => {
      this.setState({ user: data[0]});
    }
    getApiData(link, setApiData);
  }
  renderNotifBlock(notif) {
    const { name, getMsg, getLink } = notifObject[notif.action];
    let msg, link;
    if(name === 'STARTED_FOLLOWING') {
      msg = getMsg(this.state.user.displayName);
      link= getLink(this.state.user.username);
    } else if (name === 'INVITED_TO_PROJECT') {
      msg = getMsg(this.state.user.displayName, 'a project');
      link = getLink(notif.ref);
    } else if (name === 'STARTED_CONTRIBUTE_TO_PROJECT') {
      msg = getMsg(this.state.user.displayName, 'a project you own');
      link = getLink(notif.ref);
    } else if (name === 'RESPONDED_TO_POST') {
      msg = getMsg(this.state.user.displayName);
      link = getLink(notif.ref);
    }

    return (
      <a href={link}>
        <div className="row">
          <img alt="" className="col s3 m2 l2 circle" src={this.state.user.picture} />
          <div className="col s9 m10 l10 notif-msg">
            <div className="notif-text">{msg}</div>
            <div className="time-stamp">{`${dateFormatted(notif.createdAt)}`}</div>
          </div>
        </div>
      </a>
    );
  }
  render() {
    return (
      <li>
        {this.renderNotifBlock(this.props.notif)}
      </li>
    );
  }
}

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
  renderNotifs(notifs) {
    if (this.props.notifs.length === 0) {
      return <li><p className="center-align">No Notification</p></li>
    }
    return notifs.map(notif =>
      <div key={`notif-${notif._id}`}>
        <Notif notif={notif} />
      </div>
    );
  }
  render() {
    return (
      <li className="dropdown-block">
        <a className="dropdown-button" data-activates="notif-dropdown">
          <i className="material-icons">notifications_none</i>
        </a>
        <ul id="notif-dropdown" className="dropdown-content topnav-dropdown">
          {
            this.renderNotifs(this.props.notifs)
          }
          <div className="popover-arrow"></div>
        </ul>
      </li>
    );
  }
}

export default NotifDropdown;

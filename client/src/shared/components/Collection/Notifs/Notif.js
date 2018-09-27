import React from 'react';
// import PropTypes from 'prop-types';
import appRoute from '../../../data/appRoute';
import { apiLink } from '../../../data/apiLinks';
import { dateFormatted, getApiData } from '../../../../lib/helpers';
import { image } from '../../../data/assetLinks';

// The keys of the notifObject is action
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

export default class Notif extends React.Component {
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
    return this.renderNotifBlock(this.props.notif);
  }
}

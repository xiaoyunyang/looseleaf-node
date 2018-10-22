import React from 'react';

export default class NotifIcon extends React.Component {
  render() {
    const { notifs } = this.props;
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
}

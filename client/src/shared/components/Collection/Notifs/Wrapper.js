import React from 'react';
import PropTypes from 'prop-types';
import { getApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';
import appRoute from '../../../data/appRoute';
import NotifDropdown from '../../TopNavUser/NotifDropdown';
import NotifIcon from './NotifIcon';

// Callers:  User/Home.js and User/Porfolio/Main.js and User/Settings/Main.js
export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifs: []
    }
  }
  componentDidMount() {
    if (this.props.notifs) {
      this.setState({notifs: this.props.notifs})
    } else {
      this.fetchNotifs(this.props.userId);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.userId !== this.props.userId) {
      this.fetchNotifs(nextProps.userId);
    }
    if(nextProps.notifs !== this.props.notifs) {
      this.setState({notifs: nextProps.notifs.slice(0,5) });
    }
  }
  fetchNotifs(userId) {
    const link = apiLink.userNotifs(userId);
    const setApiData = data => this.setState({notifs: data});
    getApiData(link, setApiData);
  }
  markAllNotifsAsRead() {
    const notifsRead = this.state.notifs.map(notif => {
      const newNotif = {...notif};
      newNotif.read = true;
      return newNotif
    });
    this.setState({
      notifs: notifsRead
    });
  }
  render() {
    return this.props.openDropdown ? <NotifDropdown
        notifs={this.state.notifs}
        markAllNotifsAsRead={this.markAllNotifsAsRead.bind(this)}
      /> :
      <a href={appRoute('userNotif', true)} className="center-align">
        <NotifIcon notifs={this.state.notifs} />
      </a>
  }
}

Wrapper.propTypes = {
  notifs: PropTypes.array,
  userId: PropTypes.string.isRequired,

}
Wrapper.defaultProps = {
  notifs: null,
  openDropdown: false
}

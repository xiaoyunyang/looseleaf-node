import React from 'react';
import TopNav from '../../../components/TopNavUser/Main';
import Notif from '../../../components/Collection/Notifs/Notif';
import { getApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';
import LoadMoreBtn from '../../../components/LoadMoreBtn';

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifs: [],
      isLoading: true,
      page: 1,
      endOfPage: false
    };
    this.loadMoreNotifs = this.loadMoreNotifs.bind(this);
  }
  componentDidMount() {
    this.fetchNotifs(this.state.page);
  }
  fetchNotifs(page) {
    const userId = this.props.user.info._id;
    const link = apiLink.userNotifs(userId, page);
    const setApiData = data => {
      const oldNotifs = this.state.notifs;

      this.setState({
        notifs: oldNotifs.concat(data),
        isLoading: false
      });
      if (data.length < 5) { // TODO: 5 is a magic number
        this.setState({
          endOfPage: true
        });
      }
    }
    getApiData(link, setApiData);
  }
  loadMoreNotifs() {
    const nextPage = this.state.page + 1;
    this.fetchNotifs(nextPage);
    this.setState({
      page: nextPage
    });
  }
  renderNotifs(notifs) {
    if (notifs.length === 0) {
      return <p>You have no Notifications</p>
    }
    return (
      <ul id="notif-page-items" className="notif-collection">
      {
        notifs.map(notif => {
          return (
            <li key={`notif-${notif._id}`}>
              <Notif notif={notif} />
            </li>
          );
        })
      }
      </ul>
    );
  }
  render() {
    return (
      <div className="section-white" style={{minHeight: '100vh'}}>
        <TopNav route={this.props.route} user={this.props.user.info} notifs={this.state.notifs} />
        <div className="container" id="user-home">
          <h4>Your Notifications</h4>
          {this.renderNotifs(this.state.notifs)}
          {
            this.state.notifs.length > 0 && !this.state.endOfPage &&
            <LoadMoreBtn
              handleClick={this.loadMoreNotifs.bind(this)}
              itemName='Notifications'
            />
          }
        </div>
      </div>
    );
  }
}

export default Home;

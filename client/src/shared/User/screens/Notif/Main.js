import React from 'react';
import TopNav from '../../../components/TopNavUser/Main';
import Notif from '../../../components/Collection/Notifs/Notif';
import { getApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';

const userId = "5ba82f15ebb9a686850f5b58";

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifs: []
    };
  }
  componentDidMount() {
    this.getNotifs(userId);
  }
  getNotifs(userId) {
    const link = apiLink.userNotifs(userId);
    const setApiData = data => this.setState({notifs: data});
    getApiData(link, setApiData);
  }
  render() {
    return (
      <div className="section-white" style={{minHeight: '100vh'}}>
        <TopNav route={this.props.route} user={this.props.user.info} notifs={this.state.notifs} />
        <div className="container" id="user-home">
          <h4>Your Notifications</h4>
            <ul id="notif-page-items" className="notif-collection">
            {
              this.state.notifs.map(notif => {
                return (
                  <li key={`notif-${notif._id}`}>
                    <Notif notif={notif} />
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/CommunityUser/App';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import initStore from '../shared/redux/configureStore/initCommunityUserPage';
import * as actions from '../shared/redux/actions/user';
import { apiLink } from '../shared/data/apiLinks';

const store = initStore();

class AppCommunityUser extends React.Component {

  componentDidMount() {
    const usernames = [
      'default',
      'xiaoyunyang',
      'kyle'
    ];
    const username = usernames[0];

    if(username && username !== 'default') {
      this.fetchUser(username);
    }
  }
  fetchUser(username) {
    axios.get(apiLink.userByUsername(username))
      .then((response) => {
        if(response.data.length === 1) {
          store.dispatch(actions.setUser(response.data.pop()));
        } else {
          const oldUsername = store.getState().user.info.username
          window.location = `/@${oldUsername}`
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}



export default hot(module)(AppCommunityUser);

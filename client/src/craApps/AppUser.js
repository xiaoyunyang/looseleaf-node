import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/User/App';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import initStore from '../shared/redux/configureStore/initUserPage';
// import * as actions from '../shared/redux/actions/page';
import * as actions from '../shared/redux/actions/user';
import { apiLink } from '../shared/data/apiLinks';

const store = initStore();

// Get username from document.location.pathname
const getUsername = (path) => {
  let userArr = path.split('/').filter(d =>
    d.indexOf('@') !== -1
  );
  if(userArr.length > 0) {
    return userArr[0].substring(1)
  }
  return undefined;
}

class AppUser extends React.Component {
  componentDidMount() {
    if (typeof document !== 'undefined') {
      const username = getUsername(document.location.pathname);
      if(username && username !== 'default') {
        this.fetchUser(username);
      }
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

export default hot(module)(AppUser);

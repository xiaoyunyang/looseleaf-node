import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/User/App';
import { hot } from 'react-hot-loader';
//import configureStore from '../shared/redux/User/configureStore';
import initRedux from '../shared/redux/User/init-redux';
import * as actions from '../shared/redux/User/actions/user';

const store = initRedux();

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
      if(username) {
        store.dispatch(actions.getUserProfileData(username));
      }
    }
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

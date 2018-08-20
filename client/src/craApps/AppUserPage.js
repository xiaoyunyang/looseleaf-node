import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/UserPage/App';
import { hot } from 'react-hot-loader';
import initRedux from '../shared/redux/User/init-redux';
import * as actions from '../shared/redux/User/actions/user';

const store = initRedux();

class AppUserPage extends React.Component {
  componentDidMount() {
    if (typeof document !== 'undefined') {
      const username = document.location.pathname.split('/@').pop();
      console.log('AppUserPage actions = ', actions)
      store.dispatch(actions.getUserProfileData(username));
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

export default hot(module)(AppUserPage);

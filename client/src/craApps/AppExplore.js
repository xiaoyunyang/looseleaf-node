import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/Explore/App';
import { hot } from 'react-hot-loader';
import initStore from '../shared/redux/configureStore/initExplorePage';
import * as actions from '../shared/redux/actions/page';

const store = initStore();

class AppExplore extends React.Component {
  componentDidMount() {
    // The logged in user's username
    const loggedinUsername = {
      github: 'xiaoyunyang',
      kyle: 'kyle',
      henry: 'henry',
      facebook: 'xyang',
      invalid: 'foop'
    }
    if (typeof document !== 'undefined') {
      const username = document.location.pathname.split('/@').pop();
      store.dispatch(actions.getUserProfileData(username, loggedinUsername.henry));
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

export default hot(module)(AppExplore);

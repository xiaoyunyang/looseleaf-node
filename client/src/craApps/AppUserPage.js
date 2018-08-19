import React from 'react';
import { Provider } from 'react-redux';
import App from '../shared/ProjectPage/App';
import { hot } from 'react-hot-loader';
import initRedux from '../shared/redux/Project/init-redux';
import * as actions from '../shared/redux/Project/actions/project';
//import configureStore from '../shared/redux/Project/configureStoreCRA';

const store = initRedux();

class AppUserPage extends React.Component {
  componentDidMount() {
    if (typeof document !== 'undefined') {
      const username = document.location.pathname.split('/').pop();
      store.dispatch(actions.getUserPageData(username));
    }
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default hot(module)(AppUserPage);

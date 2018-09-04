import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/ProjectPage/App';
import { hot } from 'react-hot-loader';
import initStore from '../shared/redux/configureStore/initProjectPage';
import * as actions from '../shared/redux/actions/page';
//import configureStore from '../shared/redux/Project/configureStoreCRA';

const store = initStore();

class AppProjectPage extends React.Component {
  componentDidMount() {
    if (typeof document !== 'undefined') {
      const slug = document.location.pathname.split('/').pop();
      // NOTE: here we can toggle which page gets displayed (i.e., the user version or the guest version)
      // by supplying the username. If the username exists, a user version of the app will be displayed.
      // If the username does not exist, a guest version of the app will be displayed
      const username = {
        valid: 'xiaoyunyang',
        invalid: 'foop'
      }
      store.dispatch(actions.getProjectPageData(slug, username.valid));
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

export default hot(module)(AppProjectPage);

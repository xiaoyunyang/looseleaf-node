import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/Post/App';
import { hot } from 'react-hot-loader';
import initStore from '../shared/redux/configureStore/initPostPage';
import * as actions from '../shared/redux/actions/page';

const store = initStore();

class AppPost extends React.Component {
  componentDidMount() {
    if (typeof document !== 'undefined') {
      const postId = document.location.pathname.split('/').pop();
      // NOTE: here we can toggle which page gets displayed (i.e., the user version or the guest version)
      // by supplying the username. If the username exists, a user version of the app will be displayed.
      // If the username does not exist, a guest version of the app will be displayed
      const username = {
        github: 'xiaoyunyang',
        kyle: 'kyle',
        invalid: 'foop'
      }
      if (postId !== 'default') {
        store.dispatch(actions.getPostPageData(postId, username.kyle));
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

export default hot(module)(AppPost);

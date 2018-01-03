import React from 'react';
import ReactDOM from 'react-dom';
import getRoutes from '../routes';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import configureStore from '../store/configureStore';

const store = configureStore(window.INITIAL_STATE);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={getRoutes(store)}/>
      </Provider>
    );
  }
}

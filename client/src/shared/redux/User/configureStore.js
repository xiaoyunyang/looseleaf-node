import {
  createStore,
  applyMiddleware } from 'redux';
import logger from 'redux-logger'

import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

//TODO: remove logger for only production mode

const configureStore = (preloadedState) => {
  const middleware = [thunkMiddleware, logger];

  const store = createStore(
    reducers,
    {user: preloadedState},
    applyMiddleware(...middleware)
  );

  return store;
}

export default configureStore;

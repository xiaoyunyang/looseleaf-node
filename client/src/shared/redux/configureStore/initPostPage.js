import {
  createStore,
  combineReducers, // Use the combineReducers function to create one root reducer. In bigger apps you will have many reducers.
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import post from '../reducers/post';
import user from '../reducers/user';

// NOTE: The init[blank]Page are exclusively used by CRA for testing only
export default function (initialStore={}) {
  const reducers = combineReducers({
    post,
    user
  });
  const middleware = [thunkMiddleware, loggerMiddleware];
  return compose(
    applyMiddleware(...middleware)
  )(createStore)(reducers, initialStore); // the initialStore value is passed into the Redux createStore function. The store is now hydrated with the data from the server
}

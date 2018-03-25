import {
  createStore,
  combineReducers, // Use the combineReducers function to create one root reducer. In bigger apps you will have many reducers.
  applyMiddleware,
  compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

//define logger middleware: set logger for only development mode
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const configureStore = (preloadedState) => {

  const middleware = [thunkMiddleware, loggerMiddleware]

  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(...middleware)
  )
  return store
}

export default configureStore;

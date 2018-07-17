import {
  createStore,
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import reducers from './reducers';

// NOTE: This file only exists in order to allow the create-react-app
// render on default data. So the only caller of this file is
// client/src/craApps/AppProject.js
//
// This function is not used in production. the iso-middleware renderProjectApp
// function calls configureStore.
const configureStore = () => {
  const middleware = [thunkMiddleware, loggerMiddleware];
  const enhancer = compose(
    applyMiddleware(...middleware)
  );
  const store = createStore(
    reducers,
    enhancer
  );
  return store;
}

export default configureStore;

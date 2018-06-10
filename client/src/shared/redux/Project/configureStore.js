import {
  createStore,
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import reducers from './reducers';

//TODO: remove logger for only production mode

const configureStore = (preloadedState) => {
  const middleware = [thunkMiddleware, loggerMiddleware];
  const enhancer = compose(
    applyMiddleware(...middleware)
  );
  const store = createStore(
    reducers,
    {project: preloadedState},
    enhancer
  );
  return store;
}

export default configureStore;

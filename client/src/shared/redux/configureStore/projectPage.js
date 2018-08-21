import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import project from '../reducers/project';
import user from '../reducers/user';

const reducers = combineReducers({
  project,
  user
});

//TODO: remove logger for only production mode
//TODO:
const configureStore = ({project, user}, init) => {
  const middleware = [thunkMiddleware, loggerMiddleware];
  const enhancer = compose(
    applyMiddleware(...middleware)
  );
  const store = createStore(
    reducers,
    {
      project: project,
      user: user
    },
    enhancer
  );
  return store;
}

export default configureStore;

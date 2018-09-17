import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import user from '../reducers/user';

const reducers = combineReducers({
  user
});

//TODO: remove logger for only production mode
const configureStore = ({user}, init) => {
  const middleware = [thunkMiddleware, loggerMiddleware];
  const enhancer = compose(
    applyMiddleware(...middleware)
  );
  const store = createStore(
    reducers,
    {
      user: user
    },
    enhancer
  );
  return store;
}

export default configureStore;

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import post from '../reducers/post';
import user from '../reducers/user';

const reducers = combineReducers({
  post,
  user
});

//TODO: remove logger for only production mode
const configureStore = ({post, user}, init) => {
  const middleware = [thunkMiddleware, loggerMiddleware];
  const enhancer = compose(
    applyMiddleware(...middleware)
  );
  const store = createStore(
    reducers,
    {
      post: post,
      user: user
    },
    enhancer
  );
  return store;
}

export default configureStore;

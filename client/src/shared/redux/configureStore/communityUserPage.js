import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import community from '../reducers/community';
import user from '../reducers/user';

//TODO: remove logger for only production mode

const reducers = combineReducers({
  community,
  user
});

const configureStore = ({user, community}, init) => {
  const middleware = [thunkMiddleware];
  const enhancer = compose(
    applyMiddleware(...middleware)
  );
  const store = createStore(
    reducers,
    {
      community: community,
      user: user
    },
    enhancer
  );
  return store;
}

export default configureStore;

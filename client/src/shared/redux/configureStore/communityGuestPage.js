import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import community from '../reducers/community';

//TODO: remove logger for only production mode

const reducers = combineReducers({
  community
});

const configureStore = ({community}, init) => {
  const middleware = [thunkMiddleware];
  const enhancer = compose(
    applyMiddleware(...middleware)
  );
  const store = createStore(
    reducers,
    {
      community: community
    },
    enhancer
  );
  return store;
}

export default configureStore;

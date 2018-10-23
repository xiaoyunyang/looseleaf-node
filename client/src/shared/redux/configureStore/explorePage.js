import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import user from '../reducers/user';

const reducers = combineReducers({
  user
});

//TODO: remove logger for only production mode
const configureStore = ({user}, init) => {
  const middleware = [thunkMiddleware];
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

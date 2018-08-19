import {
  createStore,
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import reducers from './reducers/project';

//TODO: remove logger for only production mode

const configureStore = ({project}, init) => {
  const middleware = [thunkMiddleware, loggerMiddleware];
  const enhancer = compose(
    applyMiddleware(...middleware)
  );
  const store = createStore(
    reducers,
    {project: project},
    enhancer
  );
  console.log('store...', store)
  return store;
}

export default configureStore;

import {
  createStore,
  combineReducers, // Use the combineReducers function to create one root reducer. In bigger apps you will have many reducers.
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import recipes from './recipe-reducer';

/**
 * Since both the browser and the server will be initializing Redux, you will
 * abstract the code into a module called init-redux.
 * @param  {Object} [initialStore={}] initialStore has a value that was passed in from main.jsx. (it defaults to an empty object when none is passed in).
 * @return {[type]}                   [description]
 */
export default function (initialStore={}) {
  const reducer = combineReducers({
    recipes
  });
  const middleware = [thunkMiddleware]
  return compose(
    applyMiddleware(...middleware)
  )(createStore)(reducer, initialStore); // the initialStore value is passed into the Redux createStore function. The store is now hydrated with the data from the server
}

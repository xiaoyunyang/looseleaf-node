import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import recipes from './recipe-reducer.es6';

/**
 * [description]
 * @param  {Object} [initialStore={}] [description]
 * @return {[type]}                   [description]
 */
export default function (initialStore={}) {
  const reducer = combineReducers({
    recipes
  });
  const middleware = [thunkMiddleware]
  return compose(
    applyMiddleware(...middleware)
  )(createStore)(reducer, initialStore);
}

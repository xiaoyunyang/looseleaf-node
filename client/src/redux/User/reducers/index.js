import { combineReducers } from 'redux'
import * as userReducer from './user';

export default combineReducers(Object.assign(
  userReducer,
));

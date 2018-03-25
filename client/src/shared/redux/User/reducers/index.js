import { combineReducers } from 'redux'
import user from './user';

// Use the combineReducers function to create one root reducer.
// In our User app, we will have a few reducers.
export default combineReducers({
  user
});

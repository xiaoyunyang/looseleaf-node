import {
  GET_USER_FOLLOWERS,
  GET_USER,
  SET_USER,
  GET_LOGGED_IN_USER,
  SET_LOGGED_IN_USER,
  GET_USER_NOTIFS
 } from '../actions/user';

// NOTE:
// info is associated with the current user profile page that's being visited.
// loggedinUser is is the logged in user.
const initState = {
  info: {
    createdAt: "2018-03-12T04:10:43.893Z",
    local: {"password":"$2a$10$9sSuh.axRYv.ZWITeXQw0eLi8JQCtIZmLAHQUvIoXTf3/R1vHMqWW"},
    facebook: {"id":"10213296357138004","token":"EAAIIEI7jPi0BAPCd8uAYV0dVCAV7c4yQ4ERset8qJyA2v0Yfj7fFPlZApIBIk2Eu1r2ISb3ebJkGAqiKZAM0HviXqlkXkySgDTLWfaUKSC46l2KaLLrn5IQJ3DNDOZCZBiu4ElZA4RfINF5As1ghV87ORNQMaxfQkGyH80jz3oAZDZD"},
    _id:"5ac7f29dcc78928a6f24a100",
    username: "default",
    displayName: "Xiaoyun Yang",
    email: "shaoween232@yahoo.com",
    bio: "I love the idea of services exchanged without money. The world needs more of this! For too long a lack of finances has kept people from doing the work that they love and are actually most competent at. Here's to Simbi and a great concept well executed.",
    interests: [],
    gender: "female",
    location: "Washington, District of Columbia",
    projects: ['5b9db5777585c9479b29a98c'],
    communities: [],
    followers: ['5ac7f29dcc78928a6f24a100'],
    following: ['5b95a4bca115cf2940592b9e'],
    picture: "https://graph.facebook.com/10213296357138004/picture?type=large","__v":0
  },
  loggedinUser: {
    createdAt: "2018-03-12T04:10:43.893Z",
    local: {"password":"$2a$10$9sSuh.axRYv.ZWITeXQw0eLi8JQCtIZmLAHQUvIoXTf3/R1vHMqWW"},
    facebook: {"id":"10213296357138004","token":"EAAIIEI7jPi0BAPCd8uAYV0dVCAV7c4yQ4ERset8qJyA2v0Yfj7fFPlZApIBIk2Eu1r2ISb3ebJkGAqiKZAM0HviXqlkXkySgDTLWfaUKSC46l2KaLLrn5IQJ3DNDOZCZBiu4ElZA4RfINF5As1ghV87ORNQMaxfQkGyH80jz3oAZDZD"},
    _id:"5ac7f29dcc78928a6f24a100",
    username: "default",
    displayName: "Xiaoyun Yang",
    email: "shaoween232@yahoo.com",
    bio: "I love the idea of services exchanged without money. The world needs more of this! For too long a lack of finances has kept people from doing the work that they love and are actually most competent at. Here's to Simbi and a great concept well executed.",
    interests: [],
    gender: "female",
    location: "Washington, District of Columbia",
    communities: [],
    followers: [],
    following: [],
    picture: "https://graph.facebook.com/10213296357138004/picture?type=large","__v":0
  },
  notifs: []
};

export default function user(state = initState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        info: action.data
      }
    case GET_USER_FOLLOWERS:
      return {
        ...state,
        info: {...state.info, followers: action.data}
      }
    case GET_USER_NOTIFS:
      return {
        ...state,
        notifs: action.data
      }
    case SET_USER:
      return {
        ...state,
        info: action.data
      }
    case GET_LOGGED_IN_USER:
      return {
        ...state,
        loggedinUser: action.data
      }
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        loggedinUser: action.data
      }
    default:
      return state;  // If the reducer is triggered but no case matches, return the current store state. No changes are required so you don’t need to create a new object.
  }
}

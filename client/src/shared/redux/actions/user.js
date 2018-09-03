import fetch from 'isomorphic-fetch';
import { apiLink } from '../../data/apiLinks';

//  It is best practice to create constants for all of your actions so that
//  both the action creators (the functions listed here) and the reducers can
//  use them. This way you won’t have discrepancies between the strings.
export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';
export const GET_USER_BY_USERNAME = 'GET_USER_BY_USERNAME';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_LOGGED_IN_USER = 'GET_LOGGED_IN_USER';
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';

// The fetch recipes handles all of the logic for
// making a request to the server for the project data.
export function fetchUser(username) {
  return dispatch => {
    return fetch(apiLink.userByUsername(username), {
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => { // On a successful response, get the JSON from the response.
        return dispatch({  // Dispatch the action.
          type: GET_USER,  // Type is the only required property of every action.
          data: data.pop()  // Attach the JSON data to the action payload on a property called data.
        });
      });
    }).catch((e) => {
      console.log("error", e)
    });
  }
}
export function fetchLoggedinUser(username) {
  return dispatch => {
    return fetch(apiLink.userByUsername(username), {
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => { // On a successful response, get the JSON from the response.
        return dispatch({  // Dispatch the action.
          type: GET_LOGGED_IN_USER,  // Type is the only required property of every action.
          data: data.pop()  // Attach the JSON data to the action payload on a property called data.
        });
      });
    }).catch((e) => {
      console.log("error", e)
    });
  }
}
export function setUser(user) {
  return {  // Dispatch the action.
    type: SET_USER,
    data: user
  };
}
export function setLoggedinUser(user) {
  return {  // Dispatch the action.
    type: SET_LOGGED_IN_USER,
    data: user
  };
}

//TODO add checks for existence of data so that things don't get rerequested on the browser

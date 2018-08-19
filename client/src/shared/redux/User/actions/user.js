import fetch from 'isomorphic-fetch';
import { apiLink } from '../../../data/apiLinks';

//  It is best practice to create constants for all of your actions so that
//  both the action creators (the functions listed here) and the reducers can
//  use them. This way you won’t have discrepancies between the strings.
export const GET_USERS = 'GET_USERS';
export const GET_USER_BY_USERNAME = 'GET_USER_BY_USERNAME';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';

// The fetch recipes handles all of the logic for
// making a request to the server for the project data.
export function fetchUsers() {
  return dispatch => {
    return fetch(apiLink.users, { // Implement the fetch API for making a GET request to the appropriate endpoint.
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => { // On a successful response, get the JSON from the response.
        return dispatch({  // Dispatch the action.
          type: GET_USERS,  // Type is the only required property of every action.
          data: data  // Attach the JSON data to the action payload on a property called data.
        });
      });
    }).catch((e) => {
      console.log("error", e)
    });
  }
}
export function fetchUserByUsername(username) {
  return dispatch => {
    return fetch(apiLink.userByUsername(username), {
      method: 'GET'
    }).then((response) => {
      if(response.length===0) return;
      return response.json().then((data) => { // On a successful response, get the JSON from the response.
        console.log("data.....", data)
        if(data.length===0) return;
        return dispatch({  // Dispatch the action.
          type: GET_USER_BY_USERNAME,  // Type is the only required property of every action.
          data: data.pop()  // Attach the JSON data to the action payload on a property called data.
        });
      });
    }).catch((e) => {
      console.log("error", e)
    });
  }
}
// This action creator composes the other two action creators making it easier
// for the view and server to request the related data.
export function getHomePageData() {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchUsers())
    ])
  }
}
export function getUseProfileData(username) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchUserByUsername(username))
    ])
  }
}

//TODO add checks for existence of data so that things don't get rerequested on the browser
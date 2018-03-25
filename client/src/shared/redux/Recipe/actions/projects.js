import fetch from 'isomorphic-fetch';

// TODO: These requests has to be done through GraphQL because we would like
// to get a subset of the projects based on some filters, such as by area and by
// username of the creator and username of the one who completed the project
export const GET_NEW_PROJECTS = 'GET_NEW_PROJECTS';
export const GET_ONGOING_PROJECTS = 'GET_ONGOING_PROJECTS';
export const GET_COMPLETED_PROJECTS = 'GET_COMPLETED_PROJECTS';
export const GET_PROJECT_REQUESTS = 'GET_PROJECT_REQUESTS';

export function fetchNewProjects() {
  console.log("in fetchNewProjects!!!!!!!!!!!!!!")

  return dispatch => {
    return fetch('http://localhost:3001/api/projects/new', { // Implement the fetch API for making a GET request to the appropriate endpoint.
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => { // On a successful response, get the JSON from the response.
        console.log("data.newProjects", data.newProjects)
        return dispatch({  // Dispatch the action.
          type: GET_NEW_PROJECTS,  // Type is the only required property of every action.
          data: data.newProjects // Attach the JSON data to the action payload on a property called data.
        });
      });
    }).catch((e) => {
      console.log("error", e)
    });
  }
}

export function fetchCompletedProjects() {
  return dispatch => {
    return fetch('http://localhost:3001/api/projects/completed', {
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => {
        return dispatch({
          type: GET_COMPLETED_PROJECTS,
          data: data.completedProjects
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
      dispatch(fetchCompletedProjects()),
      dispatch(fetchNewProjects())
    ])
  }
}

//TODO add checks for existence of data so that things don't get rerequested on the browser

import fetch from 'isomorphic-fetch';

//  It is best practice to create constants for all of your actions so that
//  both the action creators (the functions listed here) and the reducers can
//  use them. This way you won’t have discrepancies between the strings.
export const GET_RECIPES = 'GET_RECIPES';
export const GET_FEATURED_RECIPE = 'GET_FEATURED_RECIPE';

// The fetch recipes handles all of the logic for
// making a request to the server for the recipes data.
export function fetchRecipes() {
  return dispatch => {
    return fetch('http://localhost:3001/api/recipes', { // Implement the fetch API for making a GET request to the appropriate endpoint.
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => { // On a successful response, get the JSON from the response.
        return dispatch({  // Dispatch the action.
          type: GET_RECIPES,  // Type is the only required property of every action.
          data: data.recipes  // Attach the JSON data to the action payload on a property called data.
        });
      });
    }).catch((e) => {
      console.log("error", e)
    });
  }
}

export function fetchFeaturedRecipe() {
  return dispatch => {
    return fetch('http://localhost:3001/api/featured', {
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => {
        return dispatch({
          type: GET_FEATURED_RECIPE,
          data: data.recipe
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
      dispatch(fetchFeaturedRecipe()),
      dispatch(fetchRecipes())
    ])
  }
}

//TODO add checks for existence of data so that things don't get rerequested on the browser

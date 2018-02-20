import fetch from 'isomorphic-fetch';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_FEATURED_RECIPE = 'GET_FEATURED_RECIPE';

export function fetchRecipes() {
  return dispatch => {
    return fetch('http://localhost:3001/api/recipes', {
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => {
        return dispatch({
          type: GET_RECIPES,
          data: data.recipes
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

export function getHomePageData() {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchFeaturedRecipe()),
      dispatch(fetchRecipes())
    ])
  }
}

//TODO add checks for existence of data so that things don't get rerequested on the browser

import {
  GET_RECIPES,
  GET_FEATURED_RECIPE } from '../actions/recipes';
// Include the constants from the action creators.

export default function recipes(state = {}, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state, // Use the spread operator to clone the state object. This maintains the immutable store.
        recipes: action.data,  // Use the data from the action to override the current state so that the new app state is the old app state with the modified data
      };
    case GET_FEATURED_RECIPE:
      return {
        ...state,
        featuredRecipe: action.data,
      };
    default:
      return state;  // If the reducer is triggered but no case matches, return the current store state. No changes are required so you don’t need to create a new object.
  }
}

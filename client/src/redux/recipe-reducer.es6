import { GET_RECIPES, GET_FEATURED_RECIPE } from './action-creators';

/**
 * [recipes description]
 * @param  {Object} [state={}] [description]
 * @param  {[type]} action     [description]
 * @return {[type]}            [description]
 */
export default function recipes(state = {}, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.data,
      };
    case GET_FEATURED_RECIPE:
      return {
        ...state,
        featuredRecipe: action.data,
      };

    default:
      return state;
  }
}

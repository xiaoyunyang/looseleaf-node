import {
  fetchNewProjects,
  fetchCompletedProjects
} from '../../Recipe/actions/projects';

import {
  fetchRecipes,
  fetchFeaturedRecipe
} from '../../Recipe/actions/recipes'

export function getHomePageData() {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchCompletedProjects()),
      dispatch(fetchNewProjects()),
      dispatch(fetchFeaturedRecipe()),
      dispatch(fetchRecipes())
    ])
  }
}

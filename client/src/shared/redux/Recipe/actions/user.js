import {
  fetchNewProjects,
  fetchCompletedProjects
} from './projects';

import {
  fetchRecipes,
  fetchFeaturedRecipe
} from './recipes'

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

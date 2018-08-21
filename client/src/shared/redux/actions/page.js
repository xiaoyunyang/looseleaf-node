import {
  fetchProjectBySlug,
} from './project';

import {
  fetchUser
} from './user';

export function getProjectPageData(slug, username) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchProjectBySlug(slug)),
      dispatch(fetchUser(username))
    ])
  }
}

export function getUserProfileData(username) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchUser(username))
    ])
  }
}

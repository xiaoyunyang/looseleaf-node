import {
  fetchProjectBySlug,
} from './project';

import {
  fetchUser,
  fetchLoggedinUser,
} from './user';

export function getProjectPageData(slug, username) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchProjectBySlug(slug)),
      dispatch(fetchLoggedinUser(username))
    ])
  }
}
export function getProjectData(slug) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchProjectBySlug(slug))
    ])
  }
}
export function getLoggedinUserData(loggedinUsername) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchLoggedinUser(loggedinUsername))
    ])
  }
}

export function getUserProfileData(username, loggedinUsername) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchUser(username)),
      dispatch(fetchLoggedinUser(loggedinUsername))
    ])
  }
}

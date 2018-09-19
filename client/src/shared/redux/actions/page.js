import {
  fetchProjectBySlug,
  fetchContributorsByIds,
  setContributors
} from './project';

import {
  fetchUser,
  fetchUserFollowers,
  fetchLoggedinUser,
} from './user';

import {
  fetchPostById
} from './post';

export function getPostPageData(postId, username) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchPostById(postId)),
      dispatch(fetchLoggedinUser(username))
    ])
  }
}

export function getProjectPageData(slug, username) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchProjectBySlug(slug)),
      dispatch(fetchLoggedinUser(username))
    ])
  }
}
export function getProjectContributors(contributorIds) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchContributorsByIds(contributorIds)),
    ])
  }
}
export function setProjectContributors(contributors) {
  return setContributors(contributors);
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
export function getUserFollowers(username) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchUserFollowers(username))
    ])
  }
}

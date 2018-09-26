// const root = '';
const root = 'http://localhost:3001';

// TODO: apiLink is the only one that should exist in this file.
// combine everything into apiLink and change the file name.
// NOTE:
// postsByContext: context can be 'project' or 'community'
// NOTE:
// postReaction: id is the postId, reaction is the name of the reaction, e.g., hearts
// data that is to be posted is the updated array of userIds for that reaction.

const query = arr => arr.reduce((acc, curr) => {
  return `${acc}${curr}+`
}, '').slice(0,-1);

export const userFeedFindBy = ({ followers, following, projects, communities, currUser }) =>  {
  const userIds = followers.concat(following);
  const queryUsers = `userIds=${query(userIds)}`;
  const queryProjects = `projectIds=${query(projects)}`;
  const queryCommunities = `communitySlugs=${query(communities)}`

  return `?${queryUsers}&${queryProjects}&${queryCommunities}&currUser=${currUser}`;
};

export const apiLink = {
  signup: `${root}/auth/signup`,
  login: `${root}/auth/login`,
  logout: `${root}/auth/logout`,
  communities: `${root}/api/community`,
  userById: id =>  `${root}/api/user?_id=${id}`,
  usersByIds: ids =>  ids.reduce((acc, id) => `${acc}_id=${id}&`,`${root}/api/user?`).slice(0, -1),
  userByUsername: username => `${root}/api/user?username=${username}`,
  userCommunities: userId => `${root}/api/user/community?_id=${userId}`, // NOTE: this is used when user clicks to join/unjoin a community
  userFollowing: userId => `${root}/api/user/following?_id=${userId}`, // NOTE: this is used when user with userId clicks to follow/unfollow another user
  userProjects: (userId, projectId, action) => `${root}/api/user/project?projectId=${projectId}&userId=${userId}&action=${action}`,
  userNotifs: userId => `${root}/api/notif?toUser=${userId}`,
  users: `${root}/api/user`,
  usersByCommunity: (slug) => `${root}/api/user?communities=${slug}`,
  projects: `${root}/api/project`,
  projectsByUserId: userId => `${root}/api/project?postedBy=${userId}`, // TODO: do we even use this? more appropriately should be called projectByCreator
  projectById: id => `${root}/api/project?_id=${id}`,
  projectBySlug: slug => `${root}/api/project?slug=${slug}`,
  projectsByContext: (context, findBy, page) => `${root}/api/project/${context}/${findBy}?page=${page}`,
  projectsByIds: ids =>  ids.reduce((acc, id) => `${acc}_id=${id}&`,`${root}/api/project?`).slice(0, -1),
  projectsByUser: (userId, projectIds, page) =>  projectIds.reduce((acc, id) => `${acc}_id=${id}&`,`${root}/api/project/user/${userId}?page=${page}&`).slice(0, -1),
  posts: `${root}/api/post`,
  postById: id => `${root}/api/post?_id=${id}`,
  postEdit: id => `${root}/api/post/edit?_id=${id}`,
  postReaction: (id, reaction) => `${root}/api/post/react?_id=${id}&reaction=${reaction}`,
  postsByContext: (context, findBy, page) => `${root}/api/post/${context}${findBy}&page=${page}`,
  postsByUserId: userId => `${root}/api/post?postedBy=${userId}`,
  authPath: `${root}/auth`
}
export const appLink = {
  postById: id => `${root}/post/${id}`,
}

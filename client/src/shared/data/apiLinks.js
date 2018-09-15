// const root = '';
const root = 'http://localhost:3001';

export const staticApiLink = {
  posts: `${root}/api/post`,
  projects: `${root}/api/project`,
  users: `${root}/api/user`,
  home: `${root}`,
  login: `${root}/auth/login`,
  signup: `${root}/auth/signup`,
  logout: `${root}/auth/logout`
};

// TODO: apiLink is the only one that should exist in this file.
// combine everything into apiLink and change the file name.
// NOTE:
// postsByContext: context can be 'project' or 'community'
// NOTE:
// postReaction: id is the postId, reaction is the name of the reaction, e.g., hearts
// data that is to be posted is the updated array of userIds for that reaction.
export const apiLink = {
  communities: `${root}/api/community`,
  userById: id =>  `${root}/api/user?_id=${id}`,
  usersByIds: ids =>  ids.reduce((acc, id) => `${acc}_id=${id}&`,`${root}/api/user?`).slice(0, -1),
  userByUsername: username => `${root}/api/user?username=${username}`,
  userCommunities: userId => `${root}/api/user/community?_id=${userId}`, // NOTE: this is used when user clicks to join/unjoin a community
  userFollowing: userId => `${root}/api/user/following?_id=${userId}`, // NOTE: this is used when user with userId clicks to follow/unfollow another user
  userProjects: (userId, projectId, action) => `${root}/api/user/project?projectId=${projectId}&userId=${userId}&action=${action}`,
  users: `${root}/api/user`,
  usersByCommunity: (slug) => `${root}/api/user?communities=${slug}`,
  projects: `${root}/api/project`,
  projectsByUserId: userId => `${root}/api/project?postedBy=${userId}`,
  projectBySlug: slug => `${root}/api/project?slug=${slug}`,
  logout: `${root}/auth/logout`,
  posts: `${root}/api/post`,
  postById: id => `${root}/api/post?_id=${id}`,
  postEdit: id => `${root}/api/post/edit?_id=${id}`,
  postReaction: (id, reaction) => `${root}/api/post/react?_id=${id}&reaction=${reaction}`,
  postsByContext: (context, findBy) => `${root}/api/post/${context}/${findBy}`,
  postsByUserId: userId => `${root}/api/post?postedBy=${userId}`,
  authPath: `${root}/auth`
}
export const appLink = {
  postById: id => `${root}/post/${id}`,
}

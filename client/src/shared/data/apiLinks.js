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
export const apiLink = {
  communities: `${root}/api/community`,
  userById: id =>  `${root}/api/user?_id=${id}`,
  userByUsername: username => `${root}/api/user?username=${username}`,
  userCommunities: userId => `${root}/api/user/community?_id=${userId}`, // TODO: refactor this
  users: `${root}/api/user`,
  usersByCommunity: (slug) => `${root}/api/user?communities=${slug}`,
  projects: `${root}/api/project`,
  projectsByUserId: userId => `${root}/api/project?postedBy=${userId}`,
  projectBySlug: slug => `${root}/api/project?slug=${slug}`,
  logout: `${root}/auth/logout`,
  posts: `${root}/api/post`,
  postById: id => `${root}/api/post?_id=${id}`,
  postsByContext: (context, findBy) => `${root}/api/post/${context}/${findBy}`,
  postsByUserId: userId => `${root}/api/post?postedBy=${userId}`,
  authPath: `${root}/auth`
}

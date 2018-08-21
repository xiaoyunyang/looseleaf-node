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
export const apiLink = {
 userById: (id) =>  `${root}/api/user?_id=${id}`,
 userByUsername: (username) => `${root}/api/user?username=${username}`,
 users: `${root}/api/user`,
 projectBySlug: (slug) => `${root}/api/project?slug=${slug}`,
 projects: `${root}/api/project`,
 logout: `${root}/auth/logout`,
 posts: `${root}/api/post`,
}

// To use this, example:
// dynamicApiLink(userId).user
// dynamicApiLink(slug).project

export const dynamicApiLink = (id) => {
  return {
    project: `${root}/api/project/${id}`, // id = slugname
    user: `${root}/api/user/${id}`, // id = user._id
    userQuery: `${root}/api/user?_id=${id}`,
    community: `${root}/api/${id}` // id = community name
  };
};

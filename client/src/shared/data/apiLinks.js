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
 user: (id) =>  `${root}/api/user?id=${id}`
}

// To use this, example:
// dynamicApiLink(userId).user
// dynamicApiLink(slug).project

export const dynamicApiLink = (id) => {
  return {
    project: `${root}/api/project/${id}`, // id = slugname
    user: `${root}/api/user/${id}`, // id = user._id
    userQuery: `${root}/api/user?id=${id}`, // id = user._id
    community: `${root}/api/${id}` // id = community name
  };
};

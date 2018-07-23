//const root = '';
const root = 'http://localhost:3001';

export const staticApiLink = {
  project: `${root}/api/project`,
  user: `${root}/api/user`,
  home: `${root}`,
  login: `${root}/auth/login`,
  signup: `${root}/auth/signup`,
};

// To use this, example:
// dynamicApiLink(userId).user
// dynamicApiLink(slug).project
export const dynamicApiLink = (id) => {
  return {
    project: `${root}/api/project/${id}`, // id = slugname
    user: `${root}/api/user/${id}`,   // id = user._id
    community: `${root}/api/${id}`,   // id = community name
  }
};

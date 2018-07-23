const root = 'http://localhost:3001';

export const staticRoutes = {
  project: '/project',
  newProject: '/project/new',
  newProject: '/project/:slug',
  userWildcard: `/*`
};


// To use this, example:
// dynamicRoutes(userId).user
// dynamicRoutes(slug).project
export const dynamicRoutes = (id) => {
  return {
    userPortfolio: `/@${id}`, // id = username
    userSettings: `/@${id}/settings`, // id = username
    userTabs: `/@${id}/:slug`,
    community: `/${id}`,   // id = community name

  }
};

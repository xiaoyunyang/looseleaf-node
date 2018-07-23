const root = 'http://localhost:3001';

export const staticRoutes = {
  project: '/project',
  newProject: '/project/new',
  userWildcard: `/*`
};


// To use this, example:
// dynamicRoutes(userId).user
// dynamicRoutes(slug).project
export const getAppRoute = (pageName) => {
  switch (pageName) {
    case 'landingHome':
      return '/';
    case 'userHome':
      return '/';
    case 'userPortfolio':
      return username => `/@${username}`;
    case 'userSettings':
      return username => `/@${username}/settings`;
    case 'userTabs':
      return username => `/@${username}/:slug`;
    case 'community':
      return name => `/community/${name}/`;
    case 'projectPage':
      return slug => `/project/${slug}/`;
    case 'project':
      return '/project';
    case 'projectNew':
      return '/project/new';
    default:
      return '';
  }
};

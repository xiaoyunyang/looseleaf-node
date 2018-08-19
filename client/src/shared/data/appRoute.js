const root = 'http://localhost:3001';

// To use this, example:
// dynamicRoutes(userId).user
// dynamicRoutes(slug).project
const appRoute = (pageName) => {
  switch (pageName) {
    case 'landingHome':
      return '/';
    case 'login':
      return '/auth/login';
    case 'signup':
      return '/auth/signup';
    case 'userHome':
      return '/';
    case 'userPortfolio':
      return username => `/@${username}`;
    case 'userSettings':
      return username => `/@${username}/settings`;
    case 'userWildcard':
      return '/*';
    case 'userTabs':
      return username => `/@${username}/:slug`;
    case 'community':
      return name => `/community/${name}/`;
    case 'projectPage':
      return slug => `/project/${slug}/`;
    case 'project':
      return '/project';
    case 'newProject':
      return '/project/edit/new';
    default:
      return '';
  }
};

// TODO: create absolute version of the above routes. Basically the same
// except prepended by 'root'

export default appRoute;

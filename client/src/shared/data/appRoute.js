// const root = 'http://localhost:3001';

// To use this, example:
// dynamicRoutes(userId).user
// dynamicRoutes(slug).project
const appRoute = (pageName) => {
  switch (pageName) {
    case 'landingHome':
      return '/';
    case 'landingHowItWorks':
      return '/how-it-works';
    case 'landingAbout':
      return '/about';
    case 'login':
      return '/auth/login';
    case 'signup':
      return '/auth/signup';
    case 'landingWildcard':
      return '/*';
    case 'userHome':
      return '/';
    case 'userProfile':
      return username => `/@${username}`;
    case 'userProfileTab':
      return username => `/@${username}/:slug`;
    case 'userSettings':
      return username => `/@${username}/settings`;
    case 'userWildcard':
      return '/*';
    case 'userTabs':
      return username => `/@${username}/:slug`;
    case 'communityHome':
      return name => `/community/${name}`;
    case 'communityOne':
      return name => `/community/${name}/projects`;
    case 'communityTwo':
      return name => `/community/${name}/discussion`;
    case 'communityThree':
      return name => `/community/${name}/people`;
    case 'communityWildcard':
      return name => `/community/${name}/*`;
    case 'projectPage':
      return slug => `/project/${slug}`;
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

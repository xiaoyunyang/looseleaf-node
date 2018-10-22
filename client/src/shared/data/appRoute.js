import { root } from './apiLinks';

// To use this, example:
// appRoute('landingAbout', true) gives you `${root}+'/about'
// appRoute('landingAbout') gives you '/about' for react router logic
// appRoute('')
// absRoute is a boolean and an optional argument.
// NOTE: To create absolute version of the route, specify absRoute to be true.
// Absolute routes are better for SEO
const appRoute = (pageName, absRoute) => {
  // if you want absolute route
  const prepend = absRoute ? root : '';

  switch (pageName) {
    case 'landingHome':
      return prepend + '/';
    case 'landingHowItWorks':
      return prepend + '/how-it-works';
    case 'landingAbout':
      return prepend + '/about';
    case 'privacy':  // privacy page can be accessed by either landing or user app
      return prepend + '/privacy';
    case 'terms': // terms page can be accessed by either landing or user app
      return prepend + '/terms';
    case 'careers':  // careers page can be accessed by either landing or user app
      return prepend + '/careers';
    case 'login':
      return '/auth/login';
    case 'signup':
      return '/auth/signup';
    case 'landingWildcard':
      return '/*'; // NOTE: used for internal routing logic only
    case 'userHome':
      return prepend + '/';
    case 'userProfile':
      return username => prepend + `/@${username}`;
    case 'userProfileTab':
      return username => `/@${username}/:slug`; // NOTE: used for internal routing logic only
    case 'userSettings':
      return username => `/@${username}/settings`;
    case 'userNotif':
      return `/notifications`;
    case 'userWildcard':
      return '/*'; // NOTE: used for internal routing logic only
    case 'userTabs':
      return username => `/@${username}/:slug`; // NOTE: used for internal routing logic only
    case 'communityHome':
      return slug => prepend + `/community/${slug}`;
    case 'communityOne':
      return slug => prepend + `/community/${slug}/projects`;
    case 'communityTwo':
      return slug => prepend + `/community/${slug}/discussion`;
    case 'communityThree':
      return name => prepend + `/community/${name}/people`;
    case 'communityWildcard':
      return slug => `/community/${slug}/*`; // NOTE: used for internal routing logic only
    case 'projectPage':
      return slug => prepend + `/project/${slug}`;
    case 'project':
      return '/project'; // TODO: do we use this anywhere?
    case 'newProject':
      return '/project/edit/new'; // NOTE: used for internal routing logic only
    case 'editProject':
      return slug => `/project/edit/${slug}`; // NOTE: used for internal routing logic only
    case 'projectWildcard':
      return '/project/*'; // NOTE: used for internal routing logic only
    case 'exploreCommunities':
      return prepend + '/explore/communities';
    case 'exploreWildcard':
      return '/explore/*';
    case 'postPage':
      return postId => prepend + `/post/${postId}`;
    case 'postWildcard':
      return '/post/*';
    default:
      return '';
  }
};


export default appRoute;

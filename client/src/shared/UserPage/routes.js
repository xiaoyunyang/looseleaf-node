import Root from './Root';
import Portfolio from '../components/Portfolio/Main'
import NotFound from '../components/NotFound';
import appRoute from '../data/appRoute';

const getTabsRoutes = (username) => {
  const tabsRoutes = [
    {
      path: appRoute('userProfile')(username),
      exact: true,
      component: Portfolio
    },
    {
      path: appRoute('userProfileTab')(username),
      component: Portfolio
    }
  ];
  return tabsRoutes;
};

const getRoutes = (user) => {

  const username = user.username;

  const routes = [
    {
      component: Root,
      routes: [
        {
          path: appRoute('userProfile')(username),
          component: Portfolio,
          routes: getTabsRoutes(username)
        },
        {
          path: appRoute('userWildcard'),
          component: NotFound
        }
      ]
    }
  ];
  return routes;
};

// Caller:
// getRoutes is used by App.js
// getNav is used by TopNav.js
export { getRoutes };

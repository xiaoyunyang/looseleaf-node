import Root from './Root';
import Home from './screens/Home';
import Settings from './screens/Settings/Main';
import Portfolio from './screens/Portfolio/Main';
import NewProject from './screens/NewProject/Main';
import NotFound from '../components/NotFound';
import appRoute from '../data/appRoute';

const root = '';

const getNav = (username) => {
  return {
    home: `/${root}`,
    portfolio: `/${root}@${username}`,
    settings: `/${root}@${username}/settings`,
    tabs: `/${root}@${username}/:slug`,
    wildcard: `/${root}*`
  };
};

const getTabsRoutes = (username) => {
  const tabsRoutes = [
    {
      path: getNav(username).portfolio,
      exact: true,
      component: Portfolio
    },
    {
      path: getNav(username).tabs,
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
          path: appRoute('userHome'),
          exact: true,
          component: Home
        },
        {
          path: appRoute('userSettings')(username),
          exact: true,
          component: Settings
        },
        {
          path: appRoute('newProject'),
          exact: true,
          component: NewProject
        },
        {
          path: appRoute('userPortfolio')(username),
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
export { getRoutes, getNav, root };

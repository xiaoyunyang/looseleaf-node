import Root from './Root';
import Home from './screens/Home';
import Settings from './screens/Settings/Main';
import Tab from './screens/Portfolio/Tab';
import NotFound from '../components/NotFound';

const root = '';

const getNav = (username) => {
  return {
    home: `/${root}`,
    portfolio: `/${root}@${username}`,
    settings: `/${root}@${username}/settings`,
    tabs: `/${root}@${username}/:slug`,
    wildcard: `/${root}*`,
  }
}

const getTabsRoutes = (username) => {
  const tabsRoutes = [
    {
      path: getNav(username).portfolio,
      exact: true,
      component: Tab
    },
    {
      path: getNav(username).tabs,
      component: Tab
    },
  ];
  return tabsRoutes;
}

const getRoutes = (user) => {

  const username = user.username;

  const routes =  [
    {
      component: Root,
      routes: [
        {
          path: getNav(username).home,
          exact: true,
          component: Home
        },
        {
          path: getNav(username).settings,
          exact: true,
          component: Settings
        },
        {
          path: getNav(username).portfolio,
          component: Tab,
          routes: getTabsRoutes(username)
        },
        {
          path: getNav(username).wildcard,
          component: NotFound
        }
      ]
    }
  ];
  return routes;
}

// Caller:
// getRoutes is used by App.js
// getNav is used by TopNav.js
export { getRoutes, getNav, root };

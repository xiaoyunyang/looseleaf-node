import Root from './Root';
import Home from './Home';
import Tab from './Profile/Tab';
import store from './store';
import NotFound from '../components/NotFound';

const root = store.root;

const getTabsRoutes = (username) => {
  const tabsRoutes = [
    {
      path: `/${root}${username}`,
      exact: true,
      component: Tab
    },
    {
      path: `/${root}${username}/:slug`,
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
          path: `/${root}`,
          exact: true,
          component: Home
        },
        {
          path: `/${root}${username}`,
          component: Tab,
          routes: getTabsRoutes(username)
        },
        {
          path: `/${root}*`,
          component: NotFound
        }
      ]
    }
  ];
  return routes;
}


export default getRoutes;

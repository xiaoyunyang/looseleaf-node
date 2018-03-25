import Root from './Root';
import Home from './Home';
import NotFound from '../components/NotFound';
import Profile from './Profile';
import Tab from './Profile/Tab';
import store from './store';

const root = store.root;
const username = store.username;

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

const routes = [
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
        component: Profile,
        routes: tabsRoutes
      },
      {
        path: `/${root}*`,
        component: NotFound
      }
    ]
  }
];

export default routes;

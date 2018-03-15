import Home from './Home';
import NotFound from '../components/NotFound';
import Profile from './Profile';
import Tab from './Profile/Tab';

const root = 'profile';
const username = 'xiaoyun-yang';

const routes = [
  {
    path: `/${root}`,
    exact: true,
    component: Home
  },
  {
    path: `/${root}/user/${username}`,
    component: Profile,
    routes: [
      {
        path: `/${root}/user/${username}`,
        exact: true,
        component: Tab
      },
      {
        path: `/${root}/user/${username}/:slug`,
        component: Tab
      }
    ]
  },
  {
    path: `/${root}*`,
    component: NotFound
  }
];

export default routes;

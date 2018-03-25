import One from './One';
import Two from './Two';
import Three from './Three';
import NotFound from '../../components/NotFound';
import store from '../store';

const root = `/${store.root}${store.username}`;

const tabs = ['projects', 'requests', 'community'];
const routes = [
  {
    path: `${root}`,
    exact: true,
    component: One
  },
  {
    path: `${root}/${tabs[0]}`,
    exact: true,
    component: One
  },
  {
    path: `${root}/${tabs[1]}`,
    component: Two
  },
  {
    path: `${root}/${tabs[2]}`,
    component: Three
  },
  {
    path: `${root}/*`,
    restricted: false,
    component: NotFound
  }
];

export { root, routes, tabs };

import One from './One';
import Two from './Two';
import Three from './Three';
import NotFound from '../../components/NotFound';

const username = 'xiaoyun-yang';
const root = `/profile/user/${username}`;

const tabs = ['one', 'two', 'three'];
const routes = [
  {
    path: `${root}`,
    exact: true,
    component: One
  },
  {
    path: `${root}/one`,
    exact: true,
    component: One
  },
  {
    path: `${root}/two`,
    component: Two
  },
  {
    path: `${root}/three`,
    component: Three
  },
  {
    path: `${root}/*`,
    restricted: false,
    component: NotFound
  }
];

export { root, routes, tabs };

import One from './One';
import Two from './Two';
import Three from './Three';
import NotFound from '../NotFound';

const root = '/profile/about';
const tabs = ['one', 'two', 'three'];
const routes = [
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

export {root, routes, tabs};

import Home from './Home';
import HowItWorks from './HowItWorks';
import NotFound from '../components/NotFound';
import One from './Community/One';
import Two from './Community/Two';
import Three from './Community/Three';

const root = 'public';
function noop() {}

const routes = [
  {
    path: `/${root}`,
    exact: true,
    component: Home
  },
  {
    path: `/${root}/how-it-works`,
    exact: true,
    component: HowItWorks
  },
  {
    path: `/${root}/login`,
    exact: true,
    component: noop
  },
  {
    path: `/${root}/community/one`,
    exact: true,
    component: One
  },
  {
    path: `/${root}/community/two`,
    exact: true,
    component: Two
  },
  {
    path: `/${root}/community/three`,
    exact: true,
    component: Three
  },
  {
    path: `/${root}*`,
    component: NotFound
  }
];

export default routes;

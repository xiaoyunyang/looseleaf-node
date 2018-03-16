import Home from './Home';
import HowItWorks from './HowItWorks';
import NotFound from '../components/NotFound';

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
    path: `/${root}*`,
    component: NotFound
  }
];

export default routes;

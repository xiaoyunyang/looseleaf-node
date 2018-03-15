import Home from './Home';
import HowItWorks from './HowItWorks';
import NotFound from '../components/NotFound';

const root = 'public';

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
    path: `/${root}*`,
    component: NotFound
  }
];

export default routes;

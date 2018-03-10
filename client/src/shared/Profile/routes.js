import Home from './Home';
import About from './About';
import NotFound from './NotFound';

const root = '/profile';
const routes = [
  {
    path: root,
    exact: true,
    component: Home
  },
  {
    path: `${root}/about`,
    component: About
  },
  {
    path: `${root}*`,
    restricted: false,
    component: NotFound
  }
];

export default routes;

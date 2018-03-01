import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';

const root = '/iso-route'
const routes = [
  {
    path: root+'/',
    exact: true,
    component: Home
  },
  {
    path: root+'/about',
    component: About
  },
  {
    path: root+'*',
    restricted: false,
    component: NotFound
  }
];

export default routes;

import Root from './Root';
import Home from './screens/Communities/Main';
import NotFound from '../components/NotFound';
import appRoute from '../data/appRoute';

// function noop() {}
const routes = [
  {
    component: Root,
    routes: [
      {
        path: appRoute('exploreCommunities'),
        exact: true,
        component: Home
      },
      {
        path: appRoute('exploreWildcard'),
        component: NotFound
      }
    ]
  }
];

export { routes };

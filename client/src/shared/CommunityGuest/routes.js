import Root from './Root';
import NotFound from '../components/NotFound';
import One from './Tabs/One';
import Two from './Tabs/Two';
import Three from './Tabs/Three';
import { communityPage as page }  from '../data/appPage';

// function noop() {}

const getRoutes = (community) => {
  const routes = [
    {
      component: Root,
      routes: [
        {
          path: page(community).home.link,
          exact: true,
          component: One
        },
        {
          path: page(community).one.link,
          exact: true,
          component: One
        },
        {
          path: page(community).two.link,
          exact: true,
          component: Two
        },
        {
          path: page(community).three.link,
          exact: true,
          component: Three
        },
        {
          path: page(community).wildcard,
          component: NotFound
        }
      ]
    }
  ];
  return routes;
}

export { getRoutes, page };

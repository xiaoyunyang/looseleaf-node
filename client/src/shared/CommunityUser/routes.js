import Root from './Root';
import NotFound from '../components/NotFound';
import One from './Tabs/One';
import Two from './Tabs/Two';
import Three from './Tabs/Three';
import { communityPage as page }  from '../data/appPage';

// function noop() {}

const getRoutes = (communityName) => {
  const routes = [
    {
      component: Root,
      routes: [
        {
          path: page(communityName).home.link,
          exact: true,
          component: One
        },
        {
          path: page(communityName).one.link,
          exact: true,
          component: One
        },
        {
          path: page(communityName).two.link,
          exact: true,
          component: Two
        },
        {
          path: page(communityName).three.link,
          exact: true,
          component: Three
        },
        {
          path: page(communityName).wildcard.link,
          component: NotFound
        }
      ]
    }
  ];
  return routes;
};

export { getRoutes, page };

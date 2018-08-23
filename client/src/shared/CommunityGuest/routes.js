import Root from './Root';
import NotFound from '../components/NotFound';
import One from './Tabs/One';
import Two from './Tabs/Two';
import Three from './Tabs/Three';
import { communityPage as page }  from '../data/appPage';

// function noop() {}

const getRoutes = (communitySlug) => {
  const routes = [
    {
      component: Root,
      routes: [
        {
          path: page(communitySlug).home.link,
          exact: true,
          component: One
        },
        {
          path: page(communitySlug).one.link,
          exact: true,
          component: One
        },
        {
          path: page(communitySlug).two.link,
          exact: true,
          component: Two
        },
        {
          path: page(communitySlug).three.link,
          exact: true,
          component: Three
        },
        {
          path: page(communitySlug).wildcard.link,
          component: NotFound
        }
      ]
    }
  ];
  return routes;
}

export { getRoutes };

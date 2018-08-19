import Root from './Root';
import NotFound from '../components/NotFound';
import One from './Tabs/One';
import Two from './Tabs/Two';
import Three from './Tabs/Three';
import appRoute from '../data/appRoute';

function noop() {}

const page = (community) => {
  return {
    home: {name: 'Projects', slug: 'projects', link: appRoute('communityHome')(community)},
    one: {name: 'Projects', slug: 'projects', link: appRoute('communityOne')(community)},
    two: {name: 'Announcements', slug: 'announcements', link: appRoute('communityTwo')(community)},
    three: {name: 'People', slug: 'people', link: appRoute('communityThree')(community)},
  }
}
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
          path: appRoute('communityWildcard')(community),
          component: NotFound
        }
      ]
    }
  ];
  return routes;
};

export { getRoutes, page };

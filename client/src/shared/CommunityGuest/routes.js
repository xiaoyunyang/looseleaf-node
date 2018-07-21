import Root from './Root';
import NotFound from '../components/NotFound';
import One from './Tabs/One';
import Two from './Tabs/Two';
import Three from './Tabs/Three';

const root = 'community/';

function noop() {}

const tabs = {
  one: 'projects',
  two: 'announcements',
  three: 'people'
}

const getNav = (community) => {
  return {
    home: `/${root}${community}`,
    one: `/${root}${community}/${tabs.one}`,
    two: `/${root}${community}/${tabs.two}`,
    three: `/${root}${community}/${tabs.three}`,
    wildcard: `/${root}*`,
  }
}
const getRoutes = (community) => {
  const routes = [
    {
      component: Root,
      routes: [
        {
          path: getNav(community).home,
          exact: true,
          component: One
        },
        {
          path: getNav(community).one,
          exact: true,
          component: One
        },
        {
          path: getNav(community).two,
          exact: true,
          component: Two
        },
        {
          path: getNav(community).three,
          exact: true,
          component: Three
        },
        {
          path: getNav(community).wildcard,
          component: NotFound
        }
      ]
    }
  ];
  return routes;
}

export { getRoutes, getNav, tabs, root };

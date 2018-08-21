import One from './One';
import Two from './Two';
import Three from './Three';
import Four from './Four';
import NotFound from '../../../components/NotFound';
import appRoute from '../../../data/appRoute';

// const root = `/${store.root}${store.username}`;

const tabs = [
  'projects', 'posts', 'followers', 'following'
];

const getRoot = (username) => {
  return appRoute('userProfile')(username);
};

const getRoutes = (username) => {
  const root = getRoot(username);
  const routes = [
    {
      path: `${root}`,
      exact: true,
      component: One
    },
    {
      path: `${root}/${tabs[0]}`,
      exact: true,
      component: One
    },
    {
      path: `${root}/${tabs[1]}`,
      component: Two
    },
    {
      path: `${root}/${tabs[2]}`,
      component: Three
    },
    {
      path: `${root}/${tabs[3]}`,
      component: Four
    },
    {
      path: `${root}/*`,
      restricted: false,
      component: NotFound
    }
  ];
  return { root, routes, tabs };
};

export { getRoot, getRoutes, tabs };

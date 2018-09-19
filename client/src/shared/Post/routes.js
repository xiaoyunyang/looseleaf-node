import Root from './Root';
import Page from './screens/Page/Main';
import NotFound from '../components/NotFound';
import appRoute from '../data/appRoute';

const getRoutes = postId => {
  const routes = [
    {
      component: Root,
      routes: [
        {
          path: appRoute('postPage')(postId),
          component: Page
        },
        {
          path: appRoute('postWildcard'),
          component: NotFound
        }
      ]
    }
  ];
  return routes;
};

// Caller:
// getRoutes is used by App.js
// getNav is used by TopNav.js
export { getRoutes };

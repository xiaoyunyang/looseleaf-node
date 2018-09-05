import Root from './Root';
import Page from './screens/Page/Main';
import New from './screens/New/Main';
import Edit from './screens/Edit/Main';
import NotFound from '../components/NotFound';
import appRoute from '../data/appRoute';

const getRoutes = (slug) => {

  const routes = [
    {
      component: Root,
      routes: [
        {
          path: appRoute('projectPage')(slug),
          component: Page
        },
        {
          path: appRoute('newProject'),
          exact: true,
          component: New
        },
        {
          path: appRoute('editProject')(slug),
          exact: true,
          component: Edit
        },
        {
          path: appRoute('projectWildcard'),
          component: NotFound
        },
      ]
    }
  ];
  return routes;
};

// Caller:
// getRoutes is used by App.js
// getNav is used by TopNav.js
export { getRoutes };

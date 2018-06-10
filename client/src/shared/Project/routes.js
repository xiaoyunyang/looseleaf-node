import Root from './Root';
import Home from './screens/Home';
import Page from './screens/Page/Main';
import NotFound from '../components/NotFound';
import NewProject from './screens/NewProject/Main';

const root = 'project';
const id = 1234;

const getNav = (username) => {
  return {
    home: `/${root}`,
    new: `/${root}/new`,
    page: `/${root}/${id}`,
    wildcard: `/${root}*`,
  }
}
const getRoutes = (user) => {

  const username = user.username;

  const routes =  [
    {
      component: Root,
      routes: [
        {
          path: getNav(username).home,
          exact: true,
          component: Home
        },
        {
          path: getNav(username).page,
          exact: true,
          component: Page
        },
        {
          path: getNav(username).new,
          exact: true,
          component: NewProject
        },
        {
          path: getNav(username).wildcard,
          component: NotFound
        }
      ]
    }
  ];
  return routes;
}

// Caller:
// getRoutes is used by App.js
// getNav is used by TopNav.js
export { getRoutes, getNav, root };

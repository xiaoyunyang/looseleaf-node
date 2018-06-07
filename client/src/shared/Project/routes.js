import Root from './Root';
import Home from './screens/Home';

const root = '';

const getNav = (username) => {
  return {
    home: `/${root}`
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

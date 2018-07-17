import fetch from 'isomorphic-fetch';
import Root from './Root';
import Home from './screens/Home';
import Page from './screens/Page/Main';
import NotFound from '../components/NotFound';
import NewProject from './screens/NewProject/Main';
import { getProjectPageData } from '../redux/Project/actions/project';

const root = 'project';

const getNav = (username) => {
  return {
    home: `/${root}`,
    new: `/${root}/new`,
    page: `/${root}/:slug`,
    wildcard: `/${root}*`,
  }
}
const loadData  = (match) => {
  //return getProjectPageData(match);
  // Alert a warning if not an absolute url
  console.log('wooooooooooo', match.params.slug);
  getProjectPageData(match.params.slug)

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
          path: getNav(username).new,
          exact: true,
          component: NewProject
        },
        {
          path: getNav(username).page,
          exact: true,
          component: Page
        },

        // {
        //   path: getNav(username).page,
        //   component: Page,
        //   loadData: loadData
        // },
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

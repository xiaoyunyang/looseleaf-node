import Root from './Root';
// import Portfolio from './screens/Portfolio/Main';
import NotFound from '../components/NotFound';
import appRoute from '../data/appRoute';

// const getTabsRoutes = (username) => {
//   const tabsRoutes = [
//     {
//       path: appRoute('userPortfolio')(username),
//       exact: true,
//       component: Portfolio
//     },
//     {
//       path: appRoute('userPortfolioTab')(username),
//       component: Portfolio
//     }
//   ];
//   return tabsRoutes;
// };


// const page = (community) => {
//   return {
//     home: {name: 'Projects', slug: 'projects', link: appRoute('communityHome')(community)},
//     one: {name: 'Projects', slug: 'projects', link: appRoute('communityOne')(community)},
//     two: {name: 'Announcements', slug: 'announcements', link: appRoute('communityTwo')(community)},
//     three: {name: 'People', slug: 'people', link: appRoute('communityThree')(community)},
//   }
// }


const getRoutes = (user) => {

  const username = user.username;
  const routes = [
    {
      component: Root,
      routes: [
        {
          path: appRoute('userPortfolio')(username),
          exact: true,
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

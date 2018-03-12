import Home from './Home';
import NotFound from './NotFound';
// import About from './Book/About';
import About from './About';
import Tab from './About/Tab';
import RedirectWithStatus from './RedirectWithStatus'
// import Two from './Two';
// import Three from './Three';

const root = '/profile';
const routes = [
  {
    path: root,
    exact: true,
    component: Home
  },
  {
    path: `${root}/about`,
		component: About,
		routes: [
			{
				path: `${root}/about`,
				exact: true,
				component: RedirectWithStatus,
        status: 301,
        to: `${root}/about/one`
			},
			{
        path: `${root}/about/:slug`,
				component: Tab
			}
		]
	},
  {
    path: `${root}*`,
    restricted: false,
    component: NotFound
  }
];

export default routes;

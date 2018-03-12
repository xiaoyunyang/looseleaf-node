import Home from './Home';
import NotFound from './NotFound';
import User from './User';
import Tab from './User/Tab';

const root = '/profile';
const username = 'xiaoyun-yang';

const routes = [
  {
    path: root,
    exact: true,
    component: Home
  },
  {
    path: `${root}/user/${username}`,
		component: User,
		routes: [
			{
				path: `${root}/user/${username}`,
				exact: true,
				component: Tab
			},
			{
        path: `${root}/user/${username}/:slug`,
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

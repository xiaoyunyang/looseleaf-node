import Root from './Root';
import Home from './screens/Home';
import HowItWorks from './screens/HowItWorks';
import About from './screens/About';
import Signup from '../components/Login/SignupPage';
import Login from '../components/Login/LoginPage'
import NotFound from '../components/NotFound';

const root = '';

// function noop() {}

const communities = {
  one: 'developers',
  two: 'designers',
  three: 'writers'
}

const getNav = () => {
  return {
    home: `/${root}`,
    howItWorks: `/${root}how-it-works`,
    about: `/${root}about`,
    signup: `/${root}signup`,
    login: `/${root}login`,
    wildcard: `/${root}*`,
  }
}
const routes = [
  {
    component: Root,
    routes: [
      {
        path: getNav().home,
        exact: true,
        component: Home
      },
      {
        path: getNav().howItWorks,
        exact: true,
        component: HowItWorks
      },
      {
        path: getNav().about,
        exact: true,
        component: About
      },
      {
        path: getNav().signup,
        exact: true,
        component: Signup
      },
      {
        path: getNav().login,
        exact: true,
        component: Login
      },
      {
        path: getNav().wildcard,
        component: NotFound
      }
    ]
  }
];

export { routes, getNav, communities, root };

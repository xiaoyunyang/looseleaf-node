import Root from './Root';
import Home from './Home';
import HowItWorks from './HowItWorks';
import Signup from './Login/SignupPage';
import Login from './Login/LoginPage'
import NotFound from '../components/NotFound';
import One from './Community/One';
import Two from './Community/Two';
import Three from './Community/Three';

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
    signup: `/${root}signup`,
    login: `/${root}login`,
    one: `/${root}community/${communities.one}`,
    two: `/${root}community/${communities.two}`,
    three: `/${root}community/${communities.three}`,
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
        path: getNav().one,
        exact: true,
        component: One
      },
      {
        path: getNav().two,
        exact: true,
        component: Two
      },
      {
        path: getNav().three,
        exact: true,
        component: Three
      },
      {
        path: getNav().wildcard,
        component: NotFound
      }
    ]
  }
];

export { routes, getNav, communities, root };

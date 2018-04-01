import Root from './Root';
import Home from './Home';
import HowItWorks from './HowItWorks';
import NotFound from '../components/NotFound';
import One from './Community/One';
import Two from './Community/Two';
import Three from './Community/Three';

const root = '';

function noop() {}

const communities = {
  one: 'developers',
  two: 'designers',
  three: 'writers'
}

const getNav = () => {
  return {
    home: `/${root}`,
    HowItWorks: `/${root}how-it-works`,
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
        path: getNav().HowItWorks,
        exact: true,
        component: HowItWorks
      },
      {
        path: getNav().login,
        exact: true,
        component: noop
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

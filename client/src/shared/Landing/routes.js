import Root from './Root';
import Home from './screens/Home';
import HowItWorks from './screens/HowItWorks';
import About from './screens/About';
import Signup from '../components/Login/SignupPage';
import Login from '../components/Login/LoginPage';
import NotFound from '../components/NotFound';
import appRoute from '../data/appRoute';

// function noop() {}
const routes = [
  {
    component: Root,
    routes: [
      {
        path: appRoute('landingHome'),
        exact: true,
        component: Home
      },
      {
        path: appRoute('landingHowItWorks'),
        exact: true,
        component: HowItWorks
      },
      {
        path: appRoute('landingAbout'),
        exact: true,
        component: About
      },
      {
        path: appRoute('signup'),
        exact: true,
        component: Signup
      },
      {
        path: appRoute('login'),
        exact: true,
        component: Login
      },
      {
        path: appRoute('landingWildcard'),
        component: NotFound
      }
    ]
  }
];

export { routes };

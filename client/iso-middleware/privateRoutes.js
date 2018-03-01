import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import Home from '../src/components/Home';
import Book from '../src/components/Book/';
import Signup from '../src/components/User/Signup';
import Login from '../src/components/User/Login';
import User from '../src/components/User/User';
import BookAll from '../src/components/Book/All';
import BookSingle from '../src/components/Book/Single';
import About from '../src/components/About';
import RedirectWithStatus from '../src/components/RedirectWithStatus';
import NotFound from '../src/components/NotFound';


polyfill();

// Custom function to load the data on the server-side
const loadData = (match) => {
  // Alert a warning if not an absolute url
  return fetch('http://localhost:3000/books.json').then(res => res.json());
};

/**
 * caller: Main
 */

const routes = [
  {
    path: '/',
    exact: true,
    restricted: false,
    component: Home
  },
  {
    path: '/book',
    component: Book,
    restricted: false,
    routes: [
      {
        path: '/book',
        exact: true,
        restricted: false,
        component: BookAll,
        loadData
      },
      {
        path: '/book/:slug',
        component: BookSingle,
        restricted: false,
        loadData
      }
    ]
  },
  {
    path: '/about',
    restricted: false,
    component: About

  },
  {
    path: '/movie',
    component: RedirectWithStatus,
    restricted: false,
    status: 301,
    to: '/book'
  },
  {
    path: '/signup',
    restricted: false,
    component: Signup
  },
  {
    path: '/login',
    restricted: false,
    component: Login
  },
  {
    path: '/user',
    restricted: true,
    component: User
  },
  /*	{
		path: '/user',
		component: RedirectWithStatus,
		toComponent: User,
		restricted: true,
		status: 401,
		to: '/login'
	}, */
  {
    path: '*',
    restricted: false,
    component: NotFound
  }
];

export default privateRoutes;

import Home from './components/Home'
import Book from './components/Book/'
import BookAll from './components/Book/All'
import BookSingle from './components/Book/Single'
import About from './components/About'
import RedirectWithStatus from './components/RedirectWithStatus'
import NotFound from './components/NotFound'
import { polyfill }  from 'es6-promise'
import fetch from 'isomorphic-fetch'

polyfill()

// Custom function to load the data on the server-side
const loadData  = (match) => {
	// Alert a warning if not an absolute url
	return fetch('http://localhost:3000/books.json')
	.then(res => res.json())
}

const routes = [
	{ path: '/',
		exact: true,
		component: Home,
	},
	{ path: '/book',
		component: Book,
		routes: [
			{
				path: '/book',
				exact: true,
				component: BookAll,
				loadData: loadData
			},
			{
				path: '/book/:slug',
				component: BookSingle,
				loadData: loadData
			}
		]
	},
	{ path: '/about',
		component: About,

	},
	{
		path: '/movie',
		component: RedirectWithStatus,
		status: 301,
		to: '/book'
	},
	{
		path: '*',
		component: NotFound
	}
]

export default routes

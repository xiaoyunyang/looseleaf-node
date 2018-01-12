import React from 'react'
import { Switch } from 'react-router-dom'
//import { renderRoutes } from 'react-router-config'
import renderRoutes from '../renderRoutes'
import routes from '../routes'

const authed = false
const authPath = '/login'

const Main = () => (
	<main>
		<Switch>
			{renderRoutes(routes, authed, authPath)}
		</Switch>
	</main>
)

/*  TODO:
	  fakeAuth is a hack to simulate auth to support testing...
    Take this out later when backend is implemented for realAuth ...
		See App2 for how this is used.

const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true
		setTimeout(cb, 100) // fake async
	},
	signout(cb) {
		this.isAuthenticated = false
		setTimeout(cb, 100)
	}
}
*/

export default Main

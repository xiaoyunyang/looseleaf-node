import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RedirectWithStatus = ({route}) => (
	<Route render={({ staticContext }) => {
		if (staticContext)
			staticContext.status = route.status
		return <Redirect to={route.to}/>
	}}/>
)


/*

Saved:


import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RedirectWithStatus = ({route}) => (
	<Route render={({ staticContext }) => {
		if (staticContext) {
			staticContext.status = route.status
		}
		if(route.authed) {
		console.log("You are authed. I'm going to route you to "+route.path)
			return <Route path={route.from} component={route.toComponent}/>
		}
		console.log("You are not authed. I'm going to route you back to /login")
		return <Redirect to='/login' from={route.from} authed={route.authed}/>
	}}/>
)
*/


export default RedirectWithStatus

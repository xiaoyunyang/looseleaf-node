import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RedirectWithStatus = ({route}) => (
	<Route render={({ staticContext }) => {
		if (staticContext)
			staticContext.status = route.status
		return <Redirect to={route.to}/>
	}}/>
)

export default RedirectWithStatus

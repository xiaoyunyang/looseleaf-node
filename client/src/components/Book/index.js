import React from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

const Book = ({route}) => (
	<Switch>
		{renderRoutes(route.routes)}
	</Switch>
)

export default Book

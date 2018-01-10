import React from 'react'
import { Route, Redirect } from 'react-router-dom'

/*  TODO:
	  This is not used anywhere but is still a component that could be of used later
*/
const PrivateRoute = ({component: Component, authed, ...rest}) => (
  <Route
    {...rest}
    render={(props) => authed === true
      ? <Component {...props} />
      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
  />
)

export default PrivateRoute

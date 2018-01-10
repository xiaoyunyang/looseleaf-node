import React from 'react'
import {
	 BrowserRouter,
	 Route,
	 Link,
	 Redirect,
	 withRouter
} from 'react-router-dom'


const User = () => (
	<div>
		<h2>User Account Page</h2>
		<p>This page is not accessible unless you are logged in as a user.</p>
	</div>
)

export default User

import React from 'react'

/* TODO: this code is used for debugging. delete after app working
import {

	 BrowserRouter,
	 Route,
	 Link,
	 Redirect,
	 withRouter
} from 'react-router-dom'

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

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))


*/



/*
class Login extends React.Component {
	state = {
		redirectToReferrer: false
	}
	login = () => {
		fakeAuth.authenticate(() => {
			this.setState(() => ({
				redirectToReferrer: true
			}))
		})
	}
	render() {
		const { redirectToReferrer } = this.state
		const { from } = this.props.location.state || { from: {pathname: '/' } }
		if(redirectToReferrer) {
			return (
				<Redirect to={from} />
			)
		}

		return (
			<div>
				<p>You must log in to view this page at {from.pathname}</p>
				<button onClick={this.login}>Log in </button>
			</div>
		)
	}
}
*/
class Login extends React.Component {
	render() {
		console.log(this.props)
		const { from } = this.props.location.state || { from: {pathname: '/' } }
		return (
			<div>
				<p>You must log in to view this page at {from.pathname} </p>
				<button onClick={this.login}>Log in </button>
			</div>
		)

	}
}

export default Login

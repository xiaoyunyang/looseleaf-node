import fs from 'fs';
import path from 'path'
import express from 'express'
import React from 'react'
import ReactDOMServer, { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'

import moment from 'moment';
import { Provider } from 'react-redux'

import App from './src/App'
import routes from './src/routes'


// User Auth Stuff - boilerplate
/*
const User = User = require('./models/User')
const userController = require('./controllers/user')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const request = require('request')
*/


// Set up ======================================================================
// get all the tools we need
const app = express()
const viewPath = process.env.DEVELOPMENT ? 'view' : 'build'
const port = process.env.PORT || 3000;
const passport = require('passport')
const flash = require('connect-flash')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const pg = require('pg')

//const configDB = require('./config/database.js');

// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport);

// set up our express application
app.use(logger('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


// Set view engine & serve static assets
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, viewPath))
app.use(express.static(path.join(__dirname, 'build')))

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Setting up the server-side app
// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
	const branch = matchRoutes(routes, req.url)
	const promises = []

	branch.forEach( ({route, match}) => {
		if (route.loadData)
			promises.push(route.loadData(match))
	})

	Promise.all(promises).then(data => {
		// data will be an array[] of datas returned by each promises.
		// console.log(data)

		const context = data.reduce( (context, data) => {
			return Object.assign(context, data)
		}, {})

		const html = renderToString(
			<StaticRouter location={req.url} context={context} >
				<App/>
			</StaticRouter>
		)

		if(context.url) {
			res.writeHead(301, {Location: context.url})
			res.end()
		}
		return res.render('index', {html})
	})
})


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

/* Old Boilerplate stuff
app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    new User({ id: payload.sub })
      .fetch()
      .then(function(user) {
        req.user = user;
        next();
      });
  } else {
    next();
  }
});


app.put('/account', userController.ensureAuthenticated, userController.accountPut)
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete)
app.post('/signup', userController.signupPost)
app.post('/login', userController.loginPost)
app.post('/forgot', userController.forgotPost)
app.post('/reset/:token', userController.resetPost)
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink)
app.post('/auth/facebook', userController.authFacebook)
app.get('/auth/facebook/callback', userController.authFacebookCallback)
app.post('/auth/google', userController.authGoogle)
app.get('/auth/google/callback', userController.authGoogleCallback)
app.post('/auth/twitter', userController.authTwitter)
app.get('/auth/twitter/callback', userController.authTwitterCallback)
app.post('/auth/github', userController.authGithub)
app.get('/auth/github/callback', userController.authGithubCallback)
*/

// launch ======================================================================
// Run server
app.listen(port, err => {
	if (err) return console.error(err)
	console.log(`Server listening at http://localhost:${port}`)
})

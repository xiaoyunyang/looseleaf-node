# LooseLeaf - Node.js App

##### TODOs
- [x] Select Web Tech Stack [HowTo doc](https://github.com/xiaoyunyang/xiaoyunyang.github.io/blob/master/assets/md/tech-behind-modern-webapps.md)
- [x] Add React Router V4
- [x] Routing in Guest Mode and User Mode - See [Solution](https://github.com/ReactTraining/react-router/issues/4962)
- [x] Set up REST API in server and isomorphic fetch in client 
- [X] Connect database to server
- [ ] Authentication - See [SetupAuth](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/auth-setup.md)
	- [X] Scotch.io's [local auth Tutorial](https://scotch.io/tutorials/easy-node-authentication-setup-and-local)
	- [X] Scotch.io's [oAuth Tutorial](https://scotch.io/tutorials/easy-node-authentication-facebook)
	- [ ] DJAM's [programming blog](https://www.djamware.com/post/59a6257180aca768e4d2b132/node-express-passport-facebook-twitter-google-github-login) to create auth via Twitter, Google, and Github.
	- [ ] Sanitize input using [`express-validator`](https://www.npmjs.com/package/express-validator)
	- [ ] Move all secret auth stuff to `.env`. See [this tutorial](http://www.clementinejs.com/tutorials/tutorial-passport.html)
- [ ] Integrate Backend With Frontend
	* [X] FullStackReact's [Tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/#enter-create-react-app) and [Sample Project](https://github.com/fullstackreact/food-lookup-demo) - A `create-react-app` with server example
	* [ ] FreeCodeCamp's [Tutorial](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)
	* [ ] Esau Silva's [Tutorial](https://esausilva.com/2017/11/14/how-to-use-create-react-app-with-a-node-express-backend-api/)
	* [ ] Codemander's [Tutorial](https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/) - Integrate react-router-v4 with server router
	* [ ] Dave Ceddia's [Tutorial](https://daveceddia.com/create-react-app-express-backend/) - `create-react-app` with express backend
	- [ ] Connect React Router V4 router to Server Router - See [This Tutorial](https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/)
	- [ ] Haphazardly thrown together [React Router 4 + Express + Passport Auth Example](https://github.com/netpoetica/react-router-passport-express-demo-app)
- [ ] Set up Redux for Frontend app

## Getting Started 

We are going to use the following stack:

- **Platform:** [node](https://nodejs.org/docs/latest/api/https.html)
- **Framework**: [express](https://expressjs.com/en/4x/api.html)
- **CSS Framework**: [materialize](http://materializecss.com/getting-started.html)
- **CSS Preprocessor**: SASS
- **JavaScript Framework**: React with React Router v4
- **Build Tool**: webpack
- **Unit Testing**: mocha
- **Database**: mongodb
- **Authentication**: facebook, email, google, github, twitter
- **Deployment**: digitalOcean

Tools

- [`create-react-app`](https://github.com/facebookincubator/create-react-app)
- [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
- [`NVM`](https://github.com/creationix/nvm)

Middleware
- [mongoose](http://mongoosejs.com/index.html) - object modeling for our MongoDB database
- [passport]() - help us authenticating with different methods

Take the following steps to create a baseline app:

1. Follow [this tutorial](http://joshbroton.com/add-react-hot-reloading-create-react-app/) to set up a [`create-react-app`](https://github.com/facebookincubator/create-react-app) with [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
	> React Hot Loader allows you to tweak React components in real time.
 
2. Follow [this tutorial](https://www.mokuji.me/article/universal-app-react-router) to set up the rest of the [`create-react-app`](https://github.com/facebookincubator/create-react-app) project to use [`react-router`](https://github.com/ReactTraining/react-router). We are going to use Version 4.x of the React Router, which is a complete rewrite of Versions 3.x and prior.

	**Warning**:  Implementing the Build, Run & Develop section in the second tutorial could cause `react-hot-loader` to not work so this section wasn't implemented in the baseline app, which is available for download [on Github](https://github.com/xiaoyunyang/looseleaf-node/tree/baseline).
	
3. [React Express Tutorial](http://www.react.express/webpack) provides a comprehensive overview of `create-react-app`.
4. Set up debugging with Webpack

5. Integrate `create-react-app` with a Node+Express API server server.



## Docs

**File Structure**

```
looseleaf-node
├───package.json
├───.babelrc
├───.env <== *
├───server
│   ├───server.js  <== **
│   ├───start-client.js	 
│   ├───build
│   ├───auth
|   |	 └───routes.js
|   |	 └───passport.js
|   |	 └───secrets.js <== *
|   |	 └───User.js
│   └───api
|   	 └───api1.js
├───client
│   ├───package.json
│   ├───config
│   ├───public
|   |   └───favicon.ico
|   |   └───index.html  <== **
│   ├───src
│   |   └───components
|   │   |   └───Header.js
|   │   |   └───Home.js
|   │   |   └───Main.js
│   |   ├───App.js
│   |   └───index.js <== **
│   |   └───routes.js
	
```

**Notes**

* Lots of extraneous folders and files were omitted from the file structure map above because they are auto-generated when you first set up your project or after when you build the project
* The files marked with `*` is omitted from the github repo because they contain authentication ids, secrets, etc that are application-specific
* The files marked with `**` is the starting point for navigating the server code and client code.



## Tutorial

* [React Express](http://www.react.express/environment)
	>Facebook provides a command-line utility called `create-react-app` which automatically sets up a new React project with a sensible default project structure and feature set. This is the best way to get started as a beginner.

	>You'll likely outgrow this option pretty quickly as you get a better grasp of React and want to customize your stack. Fortunately, create-react-app offers an `eject` option to export your app, so you're not locked in.

* [create-react-app](https://github.com/facebookincubator/create-react-app)
>Create React App is agnostic of the backend, and just produces static HTML/JS/CSS bundles.

* [my babel tutorial](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/es6-and-babel.md)


## Running the App

Before running the app, you have to set up a few things:

1. From the project directory, run the command: 
	
	```
	$ npm install && cd client && npm install && cd ..
	$ mkdir server/build
	``` 
	
	This installs all the dependencies in your `package.json` from for both the server and the client. Everytime you make changes to `package.json`, `npm install` needs to be run so that the dependencies defined in the file would get downloaded by npm. The dependencies gets downloaded into a folder called node_modules.
2. Set up your database for the app:

	**MongoDB**
	
	* Install MongoDB:  `$ brew install mongodb`
	* Create the data directory: `$ sudo mkdir -p /data/db`
	* Set permissions for the data directory: 
	
		```
		$ sudo chown -R `whoami` /data/db	
		```
	* Run MongoDB server: `$ mongod`
	* Run MongoDB shell in a separate terminal: `$ mongo`
	* Some useful commands to run in the mongo shell
	
		```
		> use test $ switch to db test
		> show collections $ list all collections inside current db
		users
		> db.users.find() $ in the users collection, return all documents
		> db.users.remove( { } ) $ remove all documents in the users collection
		> db.users.remove( { index } )
		> db.users.dropIndexes()
		```
 Check out [Azat Marda's Cheatsheet](https://github.com/azat-co/cheatsheets/tree/master/mongodb-mongoose), [Quick Reference](https://docs.mongodb.com/manual/reference/mongo-shell/), and [Little Mongo Handbook](http://openmymind.net/mongodb.pdf) for more useful commands.
	 
3. If you are developing on the client side only, `$ cd client` then `$ npm run build` or `$ yarn build` - Build the project. For production builds, you'll want to use `npm run build` to build an optimized bundle and transpiled down to ES5, which will be saved to the filesystem. If you don't have hot reloading enabled, you have to run this after making changes to your source code to allow the changes to take effect next time you start the client server. This is undesirable and there are a few workarounds, in particular, nodemon and react-hot-reloader, which will be discussed in more detail below.
	
4. For developing an integrated client and server app:

	* To run the server and client in development mode, do the following, which starts the server to automomatically listen on port 3001 ([http://localhost:3001/](http://localhost:3001/)) and the client to automomatically listen on port 3000 ([http://localhost:3000/](http://localhost:3000/)).

		```
		$ npm start
		``` 
	* To run both the client and server app, do 
	
		```
		$ npm start
		```		
	
		Alternatively,
		
		```
		$ cd client && npm start
		```

	* To run just the server app, do 
	
		```
		$ npm run start-server
		```		
	
		Alternatively,
		
		```
		$ cd client && npm start
		```
	
	* To run just the client app, do 
	
		```
		$ npm run start-client
		```		
	
		Alternatively,
		
		```
		$ cd client && npm start
		```
		
		In this mode, you can use `react-hot-loader` to make changes to react components in runtime.
		
		If you want to run on other ports, like 9000, 8000, 8080, just specify the port you want:
		
		```
		$ PORT=9000 npm start
		```
	* To run the server to serve static content:
		
		```
		$ yarn global add serve
		$ serve -s build
		```
		
		In this mode, you can't use `react-hot-loader` because the client app is rendered on the server side.
5. Stop the database server when you are done:
	* Stop the postgres database 
	 
	 ```
	 $ pg_ctl -D /usr/local/var/postgres stop
	 ```
	
	* Or if you use mongo: `control`+`C`  
	 

## Redux

> [`redux`](https://redux.js.org/) is a manager of global variables for React components.

**Middleware**

* [`redux-thunk`](https://github.com/gaearon/redux-thunk) - allows you to write action creators that return a function instead of an action. `redux-thunk` allows you to delay the dispatch of an action or to dispatch only if a certain condition is met. A thunk is a function that wraps an expression to delay its evaluation.
* [`redux-promise`](https://github.com/acdlite/redux-promise) - receives a promise, dispatch the resolved value of the promise, but will not dismatch anything if the promise rejects.
* [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) - logging tool that lets you replay problems as if they happened in your own browser.
* [`react-redux`](https://github.com/reactjs/react-redux) - We need to use `connect` from `react-redux` to connect a React component to a Redux store.

### Express

* [`morgan`](https://www.npmjs.com/package/morgan-2) - log every request to the console
* [`body-parser`](https://github.com/expressjs/body-parser) -  get information from html forms

### Authentication

See [the tutorial](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/auth-setup.md) for how to set up `passport` and `postgresql` with your react-node app.

We also need to create a controller for creating the `User` object after the user enters all the required information:

```
$ mkdir controllers
$ touch controllers/user.js
```

The `user` controller will include logic for creating a new user and authenticating a returning user. The `user` controller relies on the `User` model for creating a new `User`. The `user` controller requires the following dependencies:

* [`async`](https://caolan.github.io/async/) - We will be using `async.waterfall` a lot, which:

	> Runs the tasks array of functions in series, each passing their results to the next in the array. However, if any of the tasks pass an error to their own callback, the next function is not executed, and the main callback is immediately called with the error.
* [`nodemailer`](https://nodemailer.com/about/) - a module for Node.js applications to allow easy as cake email sending.
* [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken)
* [`moment`](https://github.com/moment/moment) - is a lightweight Javascript date library for parsing, validating, manipulating, and formatting dates.
* [`request`](https://www.npmjs.com/package/request) - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
* [`querystring`](https://nodejs.org/api/querystring.html) - Node's utilities for parsing and formatting URL query strings.


**Oauth**

1. Install dependencies
	* [`moment`](https://github.com/moment/moment), which is a lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
	* [`react-cookie`](https://github.com/reactivestack/cookies/tree/master/packages/react-cookie), which lets you load and save cookies with React.

## CSS
We are using `materialize-css`, which depends on `jquery`. Add the following to the client project:

```
$ cd client
$ npm install --save materialize-css
$ npm install --save jquery
$ touch src/assets/index.css
```
The `index.css` is where the custom styles for you app go. This will override the `materialize-css` style if you add the following imports to your `index.js` (or whatever the main entry point of your client app is):

```javascript
// src/index.js

import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css';
import './assets/index.css';
```
To use materialize components in your react components, import `jquery` and add the script in `componentDidMount`:

```javascript
// src/components/Header.js
import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

class Header extends React.Component {
  componentDidMount() {
    $(".dropdown-button").dropdown()
  }
  render() {
    // TODO: nav and dropdown menu
  }

```
What about CSS javascripts? Read the [full stack react tutorial](https://www.fullstackreact.com/p/using-webpack-with-create-react-app/) for more on that.



## DevTools
* [`morgan`](https://www.npmjs.com/package/morgan) - quest logger middleware for node.js
* [`webpack`]()
* [`babel`]()
* [`immer`](https://github.com/mweststrate/immer) - a tiny package that allows you to work with immutable state in a more convenient way. It is based on the copy-on-write mechanism.
* [`mobx`](https://github.com/mobxjs) - Simple, scalable state management


## Resources

* React
	* [My Notes on React](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/react-notes.md)
	* [My Notes on D3 React Integration](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/d3-react-integration.md)
* JavaScript, ES6, and Babel: [My Notes on ES6 and Babel](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/es6-and-babel.md)
* Express: [Manning Express In Action](https://hackerstribe.com/wp-content/uploads/2016/04/Node.js-Express-in-Action.pdf)
* Authentication and Database: [My Notes on Database and Passport setup](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/auth-setup.md)
* DevTools
	* [Webpack vs. Gulp vs. Browserify](https://www.youtube.com/watch?v=xsSnOQynTHs) 
 	>Use Webpack because it allows for hot module replacement. Webpack is a prerequisite for [`react-hot-reloader`](https://github.com/gaearon/react-hot-loader), which lets you update your react components during runtime without restarting the server via a `npm run build`.
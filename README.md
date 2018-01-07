# LooseLeaf - Node.js App

##### TODOs
- [x] Router
- [ ] Open Authentication
- [ ] Routing 
- [ ] Database setup

### Getting Started 

We are going to use the following stack:

- **Platform:** node
- **Framework**: express
- **CSS Framework**: materialize
- **CSS Preprocessor**: SASS
- **JavaScript Framework**: React with React Router v4
- **Build Tool**: webpack
- **Unit Testing**: mocha
- **Database**: postgresql
- **Authentication**: facebook,email,google,github,twitter
- **Deployment**: digitalOcean

DevOp

- [`create-react-app`](https://github.com/facebookincubator/create-react-app)
- [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
 

Take the following steps to create a baseline app:

1. Follow [this tutorial](http://joshbroton.com/add-react-hot-reloading-create-react-app/) to set up a [`create-react-app`](https://github.com/facebookincubator/create-react-app) with [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
	> React Hot Loader allows you to tweak React components in real time.
 
2. Follow [this tutorial](https://www.mokuji.me/article/universal-app-react-router) to set up the rest of the [`create-react-app`](https://github.com/facebookincubator/create-react-app) project to use [`react-router`](https://github.com/ReactTraining/react-router). We are going to use Version 4.x of the React Router, which is a complete rewrite of Versions 3.x and prior.

	**Warning**:  Implementing the Build, Run & Develop section in the second tutorial could cause `react-hot-loader` to not work so this section wasn't implemented in the baseline app, which is available for download [on Github](https://github.com/xiaoyunyang/looseleaf-node/tree/baseline).

### Running the App

Before running the app, you have to set up a few things:

1. From the project directory, run the commands: `npm install`. This installs all the dependencies in your `package.json`. Everytime you make changes to `package.json`, `npm install` needs to be run so that the dependencies defined in the file would get downloaded by npm. The dependencies gets downloaded into a folder called node_modules.
2. Set up your database for the app:
	* Install Postgres:  `brew install postgres`
	* Start postgres database:
	 	`pg_ctl -D /usr/local/var/postgres start`
	* Create database: `createdb looseleaf`
	* Run database:

		```
		psql looseleaf
		looseleaf=# \du
		```
	* Link database to your app: In the `.env` file in the root directory of the app, edit the DB_NAME line to say `DB_NAME='looseleaf'` and change `DB_USER` to the name as appeared when you run the `looseleaf=# \du` command above.
	* If you don't start the database before you run `npm start`, then you will get a "Knex: Error Pool 2 - Error: connect ECONNREFUSED" error.
3. `npm run build` or `yarn build` - Build the project. If you don't have hot reloading enabled, you have to run this after making changes to your source code to allow the changes to take effect next time you start the server. This is undesirable and there are a few workarounds, in particular, nodemon and react-hot-reloader, which will be discussed in more detail below.
4. Run the app:

	* To run the server in development mode, do the following, which starts the server to automomatically listen on port 3000: [http://localhost:3000/](http://localhost:3000/).

		```
		$ npm start
		``` 
	To run just the client app, do
		
		```
		# yarn start
		
		```
		In this mode, you can use `react-hot-loader` to make changes to react components in runtime.
		
	* To run the server to serve static content:
		
		```
		$ yarn global add serve
		$ serve -s build
		```
		In this mode, you can't use `react-hot-loader` because the client app is rendered on the server side.
5. Stop the postgres database when you are done:
	* `pg_ctl -D /usr/local/var/postgres stop`

### Redux

> [`redux`](https://redux.js.org/) is a manager of global variables for React components.

**Middleware**

* [`redux-thunk`](https://github.com/gaearon/redux-thunk) - allows you to write action creators that return a function instead of an action. `redux-thunk` allows you to delay the dispatch of an action or to dispatch only if a certain condition is met. A thunk is a function that wraps an expression to delay its evaluation.
* [`redux-promise`](https://github.com/acdlite/redux-promise) - receives a promise, dispatch the resolved value of the promise, but will not dismatch anything if the promise rejects.
* [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) - logging tool that lets you replay problems as if they happened in your own browser.
* [`react-redux`](https://github.com/reactjs/react-redux) - We need to use `connect` from `react-redux` to connect a React component to a Redux store.



### OAuth

Why Open Authentication? Per [scotch.io](https://scotch.io/tutorials/the-easiest-way-to-add-authentication-to-any-app), there are a few key reasons for this, including:
> 
* A shifting identity landscape where we are now logging in with social providers like Google, Facebook, Twitter, and others
* A desire for tighter security through features like multi-factor authentication, password-less login, and single sign-on
* A new approach for application architecture that makes it more difficult to implement authentication

1. Install redux dependencies
	* See section above
2. Install other dependencies
	* [`moment`](https://github.com/moment/moment), which is a lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
	* [`react-cookie`](https://github.com/reactivestack/cookies/tree/master/packages/react-cookie), which lets you load and save cookies with React.


### PostgresQL

##### Install Postgres
Using Homebrew:  `brew install postgres`
##### Start Postgres
* Automatic:
	* `pg_ctl -D /usr/local/var/postgres start && brew services start postgresql` - This makes Postgres start every time your computer starts up. Execute the following command
	* `brew services start postgresql` - To have launchd start postgresql now and restart at login
* Manual
	* Start Postgres: `pg_ctl -D /usr/local/var/postgres start`
	* Stop Postgres: `pg_ctl -D /usr/local/var/postgres stop`

##### Database Management
* `createdb looseleaf` - creates a database called looseleaf
* `dropdb looseleaf` - delete the database called looseleaf
* `psql looseleaf` - access the database called looseleaf. After you type this, you'll see this: `looseleaf=#`, which is the header for the postgres database interface. Type the command after the `#`. For example:
	* `looseleaf=# \du` - see what users are installed
	* `looseleaf=# \h` - help
	* `looseleaf=# \q` - quit
If you want to use a PostgresQL GUI, install and launch [Postico](https://eggerapps.at/postico/). Look up the User name using `looseleaf=# \du`.


### Resources
**React Router**

* [Starter project tutorial](https://www.mokuji.me/article/universal-app-react-router)
* [Egghead Tutorial](https://egghead.io/lessons/react-create-basic-routes-with-the-react-router-v4-browserrouter)
* [route-config example](https://reacttraining.com/react-router/web/example/route-config)
* [A Simple Tutorial](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)
* [Site Point Tutorial](https://www.sitepoint.com/react-router-v4-complete-guide/)
* [Detailed Tutorial](https://blog.digitalkwarts.com/server-side-rendering-with-reactjs-react-router-v4-react-helmet-and-css-modules/)
* [Lessons learned from migrating to v4 from an earlier version](https://webuild.envato.com/blog/a-real-word-story-of-upgrading-react-router-to-v4-in-an-isomorphic-app/)
* [unofficial migration guide](https://codeburst.io/react-router-v4-unofficial-migration-guide-5a370b8905a).
5. [Read this](https://github.com/ReactTraining/react-router/pull/4934) for more on how to fix the deprecation warnings.
	> Failed Context Types: Calling PropTypes validators directly is not supported by the `prop-types` package

**Authentication**

* Why [open authentication](https://scotch.io/tutorials/the-easiest-way-to-add-authentication-to-any-app)?


**Database**

* [codeMentor](https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx) - Getting Started Tutorial for postgresql

**DevOp**

* [Webpack vs. Gulp vs. Browserify](https://www.youtube.com/watch?v=xsSnOQynTHs) 

 >Use Webpack because it allows for hot module replacement. Webpack is a prerequisite for [`react-hot-reloader`](https://github.com/gaearon/react-hot-loader), which lets you update your react components during runtime without restarting the server via a `npm run build`.
* [React Hot Reloader Talk](https://www.youtube.com/watch?v=xsSnOQynTHs)

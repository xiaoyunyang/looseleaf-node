# LooseLeaf - Node.js App

## TODOs


### Heroku App 4/10 Checklist

- [X] Create User Account via Facebook
- [X] Create User Account via Github
- [X] Create User Account via Email and Local Strategy
- [ ] Enable csrf for the form used to submit user email and password
- [ ] List all users from GuestApp and UserApp
- [X] Server sends GuestApp if not logged in, and sends UserApp if logged in.
- [ ] Complete HowItWorks page. Serve content for the page from a markdown file.
- [ ] List some dummy data for the projects, which is hosted from JSON files stored on server
- [ ] Use settings page to see and modify user information
- [ ] Use settings page to delete user information

### Heroku App 5/1 Checklist
- [ ] When user first signs up, redirect the user to the `ProfileBuilder` app that asks a series of questions to help the user set up his/her profile.
- [ ] Add fields to User object to include areas (e.g., developers, designers, writers)
- [ ] Look into [repl.it](https://repl.it/repls), [codepen](https://codepen.io/stefanjudis/full/gkHwJ), and [Glitch](https://glitch.com/) for hosting developer projects.
- [ ] `GuestApp` Tab pages need to display project completed under each category by aspiring creators for that categories.
- [ ] The categories should be: App developer, designer, and writers
- [ ] Aspiring creators can create projects postings and work on the projects that they've created
- [ ] Project creation involves specifying the deliverable and the due date. Once a project is created, anyone can work on it.
- [ ] Deliverables may include Medium (for writing and comics), Codepen, Glitch, repl.it, and Github (repo or gist).
- [ ] All projects that has been created and completed should be displayed on a page from both the GuestApp and UserApp.
- [ ] All projects that has been completed should be displayed on the profile pages of users who have completed it.
- [ ] All projects that have been created by a user should be displayed on the profile page of that user.
- [ ] Every created project should have a page.
- [ ] There should be a discussion section for each project and a list of users who have elected to work on the project.
- [ ] If a user selected "work on it" for a project, there should be a way to undo it.
- [ ] There's a "Work on it" button for every created project.
- [ ] When the project is first being created, the creator of the project will be asked whether he or she will be working on the project also before submitting the project request for everyone to see.
- [ ] From the UserApp profile page, there should be a tab that displays all the projects this user is currently working.
- [ ] From the UserApp profile page, there should be a tab that displays all the projects this user has completed.
- [ ] Completing a project means submitting a link to the project from the project page.
- [ ] When the clock runs out on a project, the creator of the project will be prompted to select the best submittal and give review or feedback to any of the submittals thus far.

### App Setup 
**Technology selection and experimentation**

- [x] Select Web Tech Stack [HowTo doc](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/fundamental/tech-behind-modern-webapps.md)
- [x] Add React Router V4. Hack react-router-config to handle routing in Guest Mode and User Mode - See [Solution](https://github.com/ReactTraining/react-router/issues/4962)
- [x] Connect Mongo database to server using mongoose

**Set up Universal App (Isomorphic Webapp)**

- [X] Set up a single page isomorphic Webapp using [Iso Book Chapter 2 Sample Code](https://github.com/isomorphic-dev-js/chapter2-a-sample-isomorphic-app.git) as a starting point.
- [X] Set up an isomorphic router app using [Iso Book Chapter 4 Sample Code](https://github.com/isomorphic-dev-js/complete-isomorphic-example) and a few other tutorials and universal/isomorphic app repos to get everything set up with React Router 4, react-router-config, Webpack 4 and code splitting. Created a repo [isomorphic-router-demo](https://github.com/xiaoyunyang/isomorphic-router-demo) to help others who need to get started with an isomorphic router app with this stack.
- [ ] Read/archive the rest of these learning resources:
	- FreeCodeCamp's [Tutorial](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)
	- Esau Silva's [Tutorial](https://esausilva.com/2017/11/14/how-to-use-create-react-app-with-a-node-express-backend-api/)
	- Codemancer's [Tutorial](https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/) - Integrate react-router-v4 with server router
	- Dave Ceddia's [Tutorial](https://daveceddia.com/create-react-app-express-backend/) - `create-react-app` with express backend
	- Haphazardly thrown together [React Router 4 + Express + Passport Auth Example](https://github.com/netpoetica/react-router-passport-express-demo-app)
	- Patrick Cason's Tutorial for [React Router V4 Helmet Redux and Thunk](https://medium.com/@cereallarceny/server-side-rendering-with-create-react-app-fiber-react-router-v4-helmet-redux-and-thunk-275cb25ca972) 
	- Justin Jung's [React Server Sider Rendering and Hot Reloading](https://medium.com/@justinjung04/react-server-side-rendering-and-hot-reloading-ffb87ca81a89)
	- Evheniy Bystrov's [React App From Scratch](https://medium.com/@evheniybystrov/react-app-from-scratch-d694300d1631)
	- Universal Create React App [Step by Step](https://medium.com/leanjs/universal-create-react-app-step-by-step-b80ba68d125d)
	- Official Doc for React Router V4 [Server Side Rendering](https://reacttraining.com/react-router/web/guides/server-rendering)
	- React Router V4 and react-router-config [tutorial by Emile Cantin](https://blog.emilecantin.com/web/react/javascript/2017/05/16/ssr-react-router-4-webpack-code-split.html)
	- [technology-ebay-de/universal-react-router4](https://github.com/technology-ebay-de/universal-react-router4/tree/master/src/shared)
	- [zacfukuda/universal-app-react-router](https://github.com/zacfukuda/universal-app-react-router)

**Dev Workflow and environment Set up**

- Set up create-react-app for development of client application:
	- [X] Integrate create-react-app with Server API. Got create-react-app and server to run on separate localhost ports concurrently for improving separation of concerns between server code and client code. I used FullStackReact's [Tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/#enter-create-react-app) and [Sample Project](https://github.com/fullstackreact/food-lookup-demo), which is a `create-react-app` with server example.
	- [X] Set up create-react-app with webpack 4, code splitting, webpack hot module reload, webpack-dev-middleware, and react-hot-loader. Created open source starter project [isomorphic-router-demo](https://github.com/xiaoyunyang/isomorphic-router-demo)
- [x] Add eslint to both client and server.
- [X] Set up automated Testing for server: `mocha`, `chai`, `SuperTest` and `cheerio`.
 
**UserApp**

- [**Server**] Authentication and User Login - See [SetupAuth](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/guides/auth-setup.md)
	- [X] Scotch.io's [local auth Tutorial](https://scotch.io/tutorials/easy-node-authentication-setup-and-local)
	- [X] Scotch.io's [oAuth Tutorial](https://scotch.io/tutorials/easy-node-authentication-facebook) and DJAM's [programming blog](https://www.djamware.com/post/59a6257180aca768e4d2b132/node-express-passport-facebook-twitter-google-github-login) to sign up / login via Facebook and Github.
	- [ ] Sign up / Login with LinkedIn
	- [ ] Add [`nodemailer`](https://nodemailer.com/about/) and `mailgun` to allow app to send emails to users. See [this article](https://medium.com/hexient-labs/nodemailer-mailgun-4d9f18f955a9)
	- [ ] Refactor passport auth code and new user creation code to eliminate duplicate code. Fix the callback hell with mongoose database access.
	- [ ] Remove capability to for user to delete their profile. They can only deactivate it. Deleting user from database messes up the logic for creating a unique user name. 

-  [**Security**]
	- [X] Sanitize input on the server side (ejs form) using [`validator`](https://github.com/chriso/validator.js)
	- [X] Add [`helmet`](https://github.com/helmetjs/helmet) to server to mitigate cross site scripting (XSS).
	- [X] Add [https](https://certsimple.com/blog/localhost-ssl-fix) to localhost server.
	- [X] Add [`csurf`](https://github.com/expressjs/csurf) to server side forms (ejs) to protect against cross site request forgery (CSRF).
	- [ ] In the login via email strategy, rather than displaying the message indicating email has a problem or password has a problem ,simply display "Incorrect email or password". This is better from a security standpoint.
	- [ ] Move all secret auth stuff to `.env`, which is excluded from github as define din gitignore. See [this tutorial](http://www.clementinejs.com/tutorials/tutorial-passport.html)
	- [ ] Add XSS protection to client side forms. Use validator?
	- [ ] Add [`csurf`](https://github.com/expressjs/csurf) to client side forms to protect against CSRF.
	- [ ] Incorporate client-side detection and mitigation of invalid input for user login/signup forms
	- [ ] Set up auto-redirect to the HTTPS app

- [**Content**]
	- [ ] Create React component that imports text from markdown to be rendered on different pages. Gotcha: Enable [`cors`](https://github.com/expressjs/cors) before serving static content from localhost:3001 (server) for localhost:3000 (create-react-app) consumption. This is for development only. Alternatively, you can implement a [workaround](http://community.powerbi.com/t5/Developer/Error-No-Access-Control-Allow-Origin-header-is-present-on-the/m-p/351506) to add an extension to Chrome that disables CORS protection. 

- [**Universal**] UserProfileApp server and client integration
	- [ ] Create UserProfile UI in materializeCSS and React using dummy data (use create-react-app to take advantage of HMR and react hot loader).
	- [ ] Set up redux store, actions, and reducers for UserProfileApp
		- initialize redux store with server data [explanation](http://stackoverflow.com/a/33791942/458193)
		- timdorr's [data preloading example project](https://github.com/reactjs/redux/tree/master/examples/universal)
		- Jason Watmore's [example project](http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#user-actions-js) which guides you to set up react redux user registration and login
		- Scotch.io [Tutorial](https://scotch.io/courses/using-react-router-4/authentication-with-redirect)
		- [LoginFlow](https://github.com/mxstbr/login-flow) Sample/Starter project
		- Medium [React Router 4 Container for Rendering Two Versions of the app](https://medium.com/@lonesword_/authentication-with-react-router-4-x-5b377e5e05d1)
		- Tutorial from [codementor](https://www.codementor.io/kiok46/redux-store-actions-reducers-and-logger-get-started-b35h1pvpc)
	- [ ] Create Server API for user profile in server to send profile data for initial load an isomorphic fetch in client app after initial load.
	- [ ] Create lib on for client side to support isomorphic fetch:
		- Read [Google Developer's doc](https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api) to learn all about `fetch`
	- [ ] Create unit test for server api.

	
* [**Deployment**] Prep
	* [ ] Clean up run scripts in `package.json`. Turn on `forever`.
	* [ ] ServiceWorkers
	* [ ] Progressive Webapp
		* Addy Osmani's [Blog Article](https://addyosmani.com/blog/getting-started-with-progressive-web-apps/) 
		* Article on [Progressive Web App With React](https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-i-introduction-50679aef2b12)
	* [ ] Try out webpages in both the desktop and mobile version.
	* [ ] Use Google's [Lighthouse Dev Tool](https://developers.google.com/web/tools/lighthouse/#devtools) to audit webspages' performance
	* [ ] Use Google’s [PageSpeed Tools](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fgoogle.com&tab=mobile) to audit each webpages' SEO score
	* [ ] Use Chrome’s dev tools to inspect the HTML and HTTP response header
	* [ ] Use [Facebook’s Sharing Debugger Dev Tool](https://developers.facebook.com/tools/debug/sharing/?q=https%3A%2F%2Fmedium.com) to audit webpages against social sharing
	* [ ] Use the desktop version of the site with javascript disabled


## Getting Started 

We are going to use the following stack:

- **Platform:** [node](https://nodejs.org/docs/latest/api/https.html)
- **Framework**: [express](https://expressjs.com/en/4x/api.html)
- **CSS Framework**: [materialize](http://materializecss.com/getting-started.html)
- **CSS Preprocessor**: SASS
- **JavaScript Framework**: React with [`react-router`](https://github.com/ReactTraining/react-router) v4 and [`react-router-config`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config)
- **Build Tool**: webpack
- **Unit Testing**: `mocha`, `chai`
- **Integration Testing**: `SuperTest` and `cheerio`.
- **Database**: mongodb
- **Authentication**: facebook, email, google, github, twitter
- **Deployment**: digitalOcean

### Tools

- [`create-react-app`](https://github.com/facebookincubator/create-react-app)
- [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
- [`NVM`](https://github.com/creationix/nvm)

Authentication and Database Middleware

- [`mongoose`](http://mongoosejs.com/index.html) - object modeling for our MongoDB database
- [`passport`](http://www.passportjs.org/docs/authorize/) - help us authenticating with different methods

Automated Testing

- [`mocha`](https://mochajs.org/) sets up the unit test, while [`chai`](http://chaijs.com/) helps you accomplish a unit test using asserts.
- [`SuperTest`](https://github.com/visionmedia/supertest) spools up your Express server and sends requests to it.Once the requests come back, you can make assertions about the response.
- [`cheerio`](https://cheerio.js.org/) is jQuery for Node. It'll help your server code parse HTML.

### Baseline App
Take the following steps to create a baseline app:

1. Follow [this tutorial](http://joshbroton.com/add-react-hot-reloading-create-react-app/) to set up a [`create-react-app`](https://github.com/facebookincubator/create-react-app) with [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
	> React Hot Loader allows you to tweak React components in real time.
 
2. Follow [this tutorial](https://www.mokuji.me/article/universal-app-react-router) to set up the rest of the [`create-react-app`](https://github.com/facebookincubator/create-react-app) project to use [`react-router`](https://github.com/ReactTraining/react-router). We are going to use Version 4.x of the React Router, which is a complete rewrite of Versions 3.x and prior.

	**Warning**:  Implementing the Build, Run & Develop section in the second tutorial could cause `react-hot-loader` to not work so this section wasn't implemented in the baseline app, which is available for download [on Github](https://github.com/xiaoyunyang/looseleaf-node/tree/baseline).

3. FullStackReact's [Tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/#enter-create-react-app) and [Sample Project](https://github.com/fullstackreact/food-lookup-demo) - A `create-react-app` with server example
	- Pro: Builds a client app to run concurrently with a server app.
	- Con: This helps you build a single page application. If you want to build a isomorphic webapp, proceed with the next step.

4. Isomorphic Webapp Book [Chapter 2 Sample Code](https://github.com/isomorphic-dev-js/chapter2-a-sample-isomorphic-app.git)
	**Learning**

* [React Express Tutorial](http://www.react.express/webpack) provides a comprehensive overview of `create-react-app`.


## Docs

**File Structure**

```
$ tree -l 3 --ignore 'node_modules'
```

```
looseleaf-node
├───package.json
├───.babelrc
├───.env <== #C
├───server
│   ├───server.js <== #B
│   ├───start-client.js	 
│   ├───run.js <== #A
│   ├───build
│   ├───data <== #A
│   ├───assets <== #A
│   └───api
|   	 └───api1.js <== #A and #B
├───test
├───client
│   ├───package.json
│   ├───config
│   ├───public
|   |   └───favicon.ico
|   |   └───index.html  <== #B
│   ├───src
│   |   └───shared
|   |   ├── shared
|   |   |   ├───Profile
|   |   |   |   ├── App.js <== #A
|   |   |   |   ├── HTML.js <== #A
|   |   |   |   ├── Header.js
|   |   |   |   ├── Home.js
|   |   |   |   ├── Main.js
|   |   |   |   ├── NotFound.js
|   |   |   |   └── routes.js <== #A
|   |   |   └───Recipe
|   |   |       ├── App.js
|   |   |       ├── HTML.js
|   |   |       └── ...
│   |   ├───AppUser.js <== #B
│   |   └───index.js <== #B
│   |   └───main.js <== #A
|   ├───iso-middleware
|   |   ├── renderRoute.jsx <== #D
|   |   └── renderView.jsx <== #D
	
```

**Notes**

* Lots of extraneous folders and files were omitted from the file structure map above because they are auto-generated when you first set up your project or after when you build the project
* **#A**: These files are the entry points for the isomorphic webapp.
* **#B**: These files are associated with the create-react-app, which includes HMR and react-hot-loader for better development work flow. `index.js` and `index.html` are the entry points. `index.js` renders component that attaches to the root componnent identified in the `index.html` file.
* **#C**: These files are omitted from the github repo because they contain authentication ids, secrets, etc that are application-specific
* **#D**: These files are used by the server to render html pages using React code shared with the client.

## Tutorial

* [React Express](http://www.react.express/environment)
	>Facebook provides a command-line utility called `create-react-app` which automatically sets up a new React project with a sensible default project structure and feature set. This is the best way to get started as a beginner.

	>You'll likely outgrow this option pretty quickly as you get a better grasp of React and want to customize your stack. Fortunately, create-react-app offers an `eject` option to export your app, so you're not locked in.

* [create-react-app](https://github.com/facebookincubator/create-react-app)
>Create React App is agnostic of the backend, and just produces static HTML/JS/CSS bundles.
* [my babel tutorial](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/guides/es6-and-babel.md)
* [my isomorphic webapp tutorial](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/fundamental/isomorphic-webapp.md)

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
	
4. For developing an integrated client and server app, we want to  run the isomorphic webapp with the following command line:
	  
	  ```
	  $ npm start
	  ```
	  
	  This will give us access to:	  
	  - [http://localhost:3001/](http://localhost:3001/) 
	  - [http://localhost:3001/iso](http://localhost:3001/iso)
	  - [http://localhost:3001/api/hello](http://localhost:3001/api/hello)
	  If you are not seeing changes made to the client app, do the following, before running the start script again:
	  
	  ```
	  $ npm build-client
	  ```
	  
5. For developing an server and client separately

	* To run both the server and client in separately, do the following, which starts the server to automomatically listen on port 3001 ([http://localhost:3001/](http://localhost:3001/)) and the client to automomatically listen on port 3000 ([http://localhost:3000/](http://localhost:3000/)).

		```
		$ npm start-dev
		``` 
		If the single page application doesn't render correctly on the server, you need to do this:
		
		```
		# npm build-client
		```
		
		The `npm start-dev` script is equivalent to running `npm run start-server` and `npm run start-client` concurrently. We learn how to do that from FullStackReact's [Tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/#enter-create-react-app) and [Sample Project](https://github.com/fullstackreact/food-lookup-demo).
		
	* To run just the server app, do 
	
		```
		$ npm run start-server
		```		
		
	* To run both the client and server app, do
	
		```
		$ npm start-dev
		```
		
	* To run the client app, do
		
		```
		$ npm run start-client
		```
		
		Alternatively,
		
		```
		$ cd client && npm start
		```
		
		In this mode, you can use `react-hot-loader` to make changes to react components in runtime.
		
		Just go to [http://localhost:3001/api/hello](http://localhost:3000) to see change being made.

		
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

See [the tutorial](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/guides/auth-setup.md) for how to set up `passport` and `postgresql` with your react-node app.

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

* Mongoose
	* [Cheatsheet](https://www.techcress.com/mongoose-js-query-cheatsheet/)
* React
	* [My Notes on React](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/react-notes.md)
	* [My Notes on D3 React Integration](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/d3-react-integration.md)
* JavaScript, ES6, and Babel: [My Notes on ES6 and Babel](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/es6-and-babel.md)
* Express: [Manning Express In Action](https://hackerstribe.com/wp-content/uploads/2016/04/Node.js-Express-in-Action.pdf)
* Authentication and Database: [My Notes on Database and Passport setup](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/auth-setup.md)
* DevTools
	* [Webpack vs. Gulp vs. Browserify](https://www.youtube.com/watch?v=xsSnOQynTHs) 
 	>Use Webpack because it allows for hot module replacement. Webpack is a prerequisite for [`react-hot-reloader`](https://github.com/gaearon/react-hot-loader), which lets you update your react components during runtime without restarting the server via a `npm run build`.
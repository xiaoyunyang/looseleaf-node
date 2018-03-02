# Node/Express/React Isomorphic WebApp

**What we want**:

* Running client app and server app on separate localhost servers
* Server-side rendering and client side rendering of HTML
* eslint
* React Hot Module Reload
* Routing using React Router v4

### File Structure
**File Structure**

```
my-app
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
│   |   └───components
|   │   |   └───Recipe <== #A
|   │   |   └───Header.js
|   │   |   └───Home.js
|   │   |   └───Main.js
│   |   └───redux <== #A
│   |   ├───App.js
│   |   └───index.js <== #B
│   |   └───main.js <== #A
│   |   └───routes.js
│   |   └───style.css <== #A

```

* **#A**: These files are the entry point for navigating the isomorphic webapp.
* **#B**: These files are the entry point for navigating the server code and client code.
* **#C**: These files are omitted from the github repo because they contain authentication ids, secrets, etc that are application-specific
 

Take the following steps to create a baseline app:

1. Follow [this tutorial](http://joshbroton.com/add-react-hot-reloading-create-react-app/) to set up a [`create-react-app`](https://github.com/facebookincubator/create-react-app) with [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
	> React Hot Loader allows you to tweak React components in real time.
 
2. Follow [this tutorial](https://www.mokuji.me/article/universal-app-react-router) to set up the rest of the [`create-react-app`](https://github.com/facebookincubator/create-react-app) project to use [`react-router`](https://github.com/ReactTraining/react-router). We are going to use Version 4.x of the React Router, which is a complete rewrite of Versions 3.x and prior.

	**Warning**:  Implementing the Build, Run & Develop section in the second tutorial could cause `react-hot-loader` to not work so this section wasn't implemented in the baseline app, which is available for download [on Github](https://github.com/xiaoyunyang/looseleaf-node/tree/baseline).

3. FullStackReact's [Tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/#enter-create-react-app) and [Sample Project](https://github.com/fullstackreact/food-lookup-demo) - A `create-react-app` with server example.
	- Pro: Builds a client app to run concurrently with a server app.
	- Con: This helps you build a single page application. If you want to build a isomorphic webapp, proceed with the next step.

4. Isomorphic Webapp Book [Chapter 2 Sample Code](https://github.com/isomorphic-dev-js/chapter2-a-sample-isomorphic-app.git)
	- Gotcha: if you are trying to integrate this example into your existing `create-react-app`, make sure to add the following babel config:
	
	```
	// webpack.config.js
	
	process.env.NODE_ENV = 'development';
	
	module.exports = {
	  entry: [
	    'babel-polyfill',
	    './client/src/main.jsx',
	  ],
	  output: {
	    path: __dirname + '/client/public',
	    filename: 'browser.js',
	  },
	  module: {
	    rules: [
	      {
	        test: /\.(jsx|es6)$/,
	        exclude: /node_modules/,
	        loader: 'babel-loader',
	      },
	      {
	        test: /\.css$/,
	        loaders: ['style-loader', 'css-loader'],
	      },
	    ],
	  },
	  resolve: {
	    extensions: ['.js', '.jsx', '.css', '.es6'],
	  },
	};

	```
	
	```
	// .babelrc
	{
	  "presets": [
	    "env",
	    "stage-2",
	    "react"
	  ],
	  "plugins": [
	    "transform-runtime",
	    "transform-es2015-destructuring",
	    "transform-es2015-parameters",
	    "transform-object-rest-spread"
	  ]
	}
	```
	
	```
	// run.js
	// Include Babel
	// it will parse all code that comes after it.
	// (Not recommended for production use).

	process.env.NODE_ENV = 'development';
	require('babel-register')({
	  ignore: /\/(build|node_modules)\//,
	  presets: ['env', 'react-app']
	});
	
	require('./server.js');
	```
	
	If you don't do this, you'll have [this issue](https://github.com/facebook/create-react-app/issues/2377).
	
	Also, make sure to make these changes to make in `client/public/index.html`, just underneath `<div id="root"></div>`, the following is present:

	```
	<script src="./browser.js"></script>
	```
5. Follow [this tutorial](http://www.acuriousanimal.com/2016/08/14/configuring-atom-with-eslint.html) to add `eslint` to project (assuming Atom is the editor).

### Running the App

Before running the app, you have to set up a few things:

1. From the project directory, run the command: 
	
	```
	$ npm install && cd client && npm install && cd ..
	$ mkdir server/build
	``` 
	
	This installs all the dependencies in your `package.json` from for both the server and the client. Everytime you make changes to `package.json`, `npm install` needs to be run so that the dependencies defined in the file would get downloaded by npm. The dependencies gets downloaded into a folder called node_modules.
2. If you are developing on the client side only, `$ cd client` then `$ npm run build` or `$ yarn build` - Build the project. For production builds, you'll want to use `npm run build` to build an optimized bundle and transpiled down to ES5, which will be saved to the filesystem. If you don't have hot reloading enabled, you have to run this after making changes to your source code to allow the changes to take effect next time you start the client server. This is undesirable and there are a few workarounds, in particular, nodemon and react-hot-reloader, which will be discussed in more detail below.
3. For developing an integrated client and server app, we want to  run the isomorphic webapp with the following command line:
	  
	  ```
	  $ npm start
	  ```
	  
	  This will give us access to:	  
	  - [http://localhost:3001/](http://localhost:3001/) 
	  - [http://localhost:3001/](http://localhost:3001/iso)
	  - [http://localhost:3001/api/hello](http://localhost:3001/api/hello)
	  
	  If you are not seeing changes made to the client app, do the following, before running the start script again:
	  
	  ```
	  $ npm build-client
	  ```
4. For developing an server and client separately	  
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

**React**

* [Migration log](https://reactjs.org/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes)

**Database**

* [codeMentor](https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx) - Getting Started Tutorial for postgresql

**Tutorials**

* [Webpack vs. Gulp vs. Browserify](https://www.youtube.com/watch?v=xsSnOQynTHs) 

 >Use Webpack because it allows for hot module replacement. Webpack is a prerequisite for [`react-hot-reloader`](https://github.com/gaearon/react-hot-loader), which lets you update your react components during runtime without restarting the server via a `npm run build`.

* [React Hot Reloader Talk](https://www.youtube.com/watch?v=xsSnOQynTHs)
* [React Router V4 Helmet Redux and Thunk](https://medium.com/@cereallarceny/server-side-rendering-with-create-react-app-fiber-react-router-v4-helmet-redux-and-thunk-275cb25ca972) 
* [React Server Sider Rendering and Hot Reloading](https://medium.com/@justinjung04/react-server-side-rendering-and-hot-reloading-ffb87ca81a89)
* [React App From Scratch](https://medium.com/@evheniybystrov/react-app-from-scratch-d694300d1631)
* [Universal Create React App Step by Step](https://medium.com/leanjs/universal-create-react-app-step-by-step-b80ba68d125d)
* [Facey Spacey's React Universal Component](https://github.com/faceyspacey/react-universal-component)
FreeCodeCamp's [Tutorial](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)
* Esau Silva's [Tutorial](https://esausilva.com/2017/11/14/how-to-use-create-react-app-with-a-node-express-backend-api/)
* Codemander's [Tutorial](https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/) - Integrate react-router-v4 with server router
* Dave Ceddia's [Tutorial](https://daveceddia.com/create-react-app-express-backend/) - `create-react-app` with express backend
* Haphazardly thrown together [React Router 4 + Express + Passport Auth Example](https://github.com/netpoetica/react-router-passport-express-demo-app)

**Middleware**

- [`create-react-app`](https://github.com/facebookincubator/create-react-app)
- [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
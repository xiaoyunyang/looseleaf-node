## LooseLeaf - Node.js App

### Start with Template
Generate App using [http://megaboilerplate.com](http://megaboilerplate.com). See [Doc](https://github.com/sahat/megaboilerplate#getting-started). I chose the following configuration:
#### Configuration
- **Platform:** node
- **Framework**: express
- **Template Engine**: handlebars
- **CSS Framework**: foundation
- **CSS Preprocessor**: sass
- **JavaScript Framework**: react
- **Build Tool**: webpack
- **Unit Testing**: mocha
- **Database**: postgresql
- **Authentication**: facebook,email,google,github,twitter
- **Deployment**: digitalOcean

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
3. `npm run build` - Build the project. If you don't have hot reloading enabled, you have to run this after making changes to your source code to allow the changes to take effect next time you start the server. This is undesirable and there are a few workarounds, in particular, nodemon and react-hot-reloader, which will be discussed in more detail below.
4. Run the server. Two ways:
	*  `npm start` - Start Express Terminal, which starts a server to automomatically listen on port 3000: [http://localhost:3000/](http://localhost:3000/). If you use Webpack's Hot Module Reload to accomplish hot reload of client side code (e.g., React Components), run server with `npm start` rather than `npm run dev` for better performance.
	* `npm run dev` - In development mode, you may want to restart the server every time a file in the directory where server.js lies is changed. You need to install [Nodemon](https://www.npmjs.com/package/nodemon) to make this work. Nodemon is a utility that monitor for any changes in your source code and automatically restart your server. Here's how you configure your app to do this:
		1. `npm install nodemon --save-dev` - The save-dev flag indicates this is a devDependency. We don't want to do nodemon for the production version of the app.
		2. Add the following lines to `package.json`:
		
			```
			// package.json
			{
			  "scripts": {
			    "start": "node server.js",
			    "dev": "nodemon server.js",
	    	  },
	    	}
			```
5. Stop the postgres database when you are done:
	* `pg_ctl -D /usr/local/var/postgres stop` 

### React Hot Reloader
* For step-by-step on how to install, follow the instruction [here](https://github.com/gaearon/react-hot-loader). Note, for step 2 of the tutorial where you enable Hot Module Replacement in Webpack, use [this instruction](https://github.com/glenjamin/webpack-hot-middleware) for enabling webpack hot reloading using only webpack-dev-middleware (for existing server without webpack-dev-server).
* Important: If you use Hot Module Reload, run server with `npm start` rather than `npm run dev` because according to the [Webpack hot middleware Doc](https://github.com/glenjamin/webpack-hot-middleware):

	> This module expects to remain running while you make changes to your webpack bundle, if you use a process manager like nodemon then you will likely see very slow changes on the client side. If you want to reload the server component, either use a separate process, or find a way to reload your server routes without restarting the whole process.

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

### Tutorial and Resources
* Database
	* [codeMentor](https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx) - Getting Started Tutorial for postgresql
* Front-end
* Bundling Tool
	* [Webpack vs. Gulp vs. Browserify](https://www.youtube.com/watch?v=xsSnOQynTHs) - Use Webpack because it allows for hot module replacement. Webpack is a prerequisite for [react-hot-reloader](https://github.com/gaearon/react-hot-loader), which lets you update your react components during runtime without restarting the server via a `npm run build`.
	* [React Router Tutorial](https://reacttraining.com/react-router/web/example/route-config)
	* [React Hot Reloader Talk](https://www.youtube.com/watch?v=xsSnOQynTHs)

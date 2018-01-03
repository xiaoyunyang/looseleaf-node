## LooseLeaf - Node.js App

Generate App using [http://megaboilerplate.com](http://megaboilerplate.com). See [doc](https://github.com/sahat/megaboilerplate#getting-started) I chose the following configuration:
### Configuration
- **Platform:** node
- **Framework**: express
- **Template Engine**: handlebars
- **CSS Framework**: foundation
- **CSS Preprocessor**: sass
- **JavaScript Framework**: react
- **Build Tool**: gulp
- **Unit Testing**: mocha
- **Database**: postgresql
- **Authentication**: facebook,email,google,github,twitter
- **Deployment**: digitalOcean

### Running the App
In package.json, there's this line: ``"start": "node server.js",``, which sets 

Before the first time you run the app, you have to set up a few things:

1. From the project directory, run the commands: `npm install` and `npm run build` (if node or gulp build tool installed). This installs all the dependencies in your package.json
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
	* Link database to your app: In the .env file in the root directory of the app, edit the DB_NAME line to say `DB_NAME='looseleaf'`
	* If you don't start the database before you run `npm start`, then you will get a "Knex: Error Pool 2 - Error: connect ECONNREFUSED" error. 
3. `npm start` - Start Express Terminal, which starts a server to automomatically listen on port 3000: [http://localhost:3000/](http://localhost:3000/)
4. Stop the postgres database when you are done:
	* `pg_ctl -D /usr/local/var/postgres stop` 

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

##### Tutorial
* [codeMentor](https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx) - Getting Started Tutorial

### License
The MIT License (MIT)

Copyright (c) 2016 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

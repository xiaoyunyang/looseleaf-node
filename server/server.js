// Set up ======================================================================
// get all the tools we need
import express from 'express';
import https from 'https';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import session from 'cookie-session';
//import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import cors from 'cors';
import chalk from 'chalk';

// import enforceSSL from 'express-enforces-ssl';
import helmet from 'helmet';
import ms from 'ms';
import validator from 'validator';

require('dotenv').config();

// Configuration ===============================================================
const app = express();
app.set('port', process.env.PORT || 8080);
app.use(logger('short'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.enable('trust proxy');
// app.use(enforceSSL());
app.disable('x-powered-by');

app.use(helmet.hsts({
  maxAge: ms('1 year'),
  includeSubdomains: true
}));

// mitigate cross site scripting
// Implement X-XSS-Protection, which configures
// HTTP header with X-XSS-Protection: "1; mode=block"
// This header is supported by IE and webkit browsers like Chrome and Safari.
// It is not supported in Firefox.
app.use(helmet.xssFilter());
app.use(helmet.frameguard('sameorigin'));
app.use(helmet.noSniff()); // Don’t let browsers infer the file type
// mitigate cross site request forgery

// connect to our database
// set up ejs for templating - for prototyping server only
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));


// setup static files, server main.bundle.js (webpacked file) from root
// Express must only serves static assets in production
const clientAppPathProd = path.join(__dirname, '../', 'client/src/assets');
const clientAppPathDev = path.join(__dirname, '../', 'client/src/assets');

if (process.env.NODE_ENV === 'production') {
  console.log(chalk.blue('Running in production mode'));
  mongoose.connect('mongodb://mongo:27017');
  // The below code allows client app to run from the the server (localhost:3001)
  app.use('/', express.static(clientAppPathProd));
} else if (process.env.NODE_ENV === 'development') {
  console.log(chalk.blue('Running in development mode'));
  // TODO: cors allows anyone to access my api. can't use for production
  // This is not a fix for production or when application has to be shown
  // to the client, this is only helpful when UI and Backend development
  // are on different servers and in production they are actually on same
  // server.
  mongoose.connect(process.env.MONGODB);
  app.use(cors());

  // Note: make sure to enable cors, then serve static. In node,
  // order matters.
  app.use('/', express.static(clientAppPathDev));
}

// API =========================================================================
/*
 This is getting sent to localhost:3001/api/hello. In your terminal try:
 $ curl localhost:3001/api/hello
 */
const apiVersion1 = require('./api1/api');

app.use('/api', apiVersion1);

// Isomorphic Webapp ===========================================================

// handle the isomorphic page render
// Auth ========================================================================
// required for passport
// TODO: "secret" needs to be secret and a bunch of random characters
app.use(session({
  secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require('./auth/routes');
const appRoutes = require('./routes');
const configPassport = require('./auth/passport.js');

app.use('/auth', authRoutes);
app.use('/', appRoutes);
configPassport();


// Send to SuperTest for test ==================================================
app.get('/test/', (req, res) => {
  const userAgent = req.headers['user-agent'] || 'none';
  if (req.accepts('html')) {
    res.render('test', { userAgent });
  } else {
    res.type('text');
    res.send(userAgent);
  }
});

// The following url causes cross site scripting. Chrome will prevent this scripts
// but firefox will not
// http://localhost:3001/test/search?q=<script>alert("you are hacked")</script>
// validator.escape makes <script>alert("you are hacked") into:
// &lt;script&gt;alert(&quot;you are hacked&quot;)&lt;&#x2F;script&gt;
app.get('/test/search', (req, res) => {
  const userAgent = validator.escape(req.query.q) || '';
  res.render('test', { userAgent });
});


// Error Handler ===============================================================

// middleware that logs the error
app.use((err, req, res, next) => {
  // console.error(err)
  next(err);
});

// middleware that responds to the 404 error
// The 404 error is associated with a GET request failure
app.use((req, res) => {
  res.status(404).render('404');
  // alternative:
  // res.status(404).json({ error: "Resource not found!" });
});

app.use((req, res) => {
  res.status(403).send('Forbidden resource');
});


// middleware that responds to the 500 error
// The 500 error is associated with a requesting a file that does not exist
app.use((err, req, res) => {
  res.status(500).send(`Internal server error ${err}`);
});

app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    next(err);
    return;
  }
  res.status(403);
  res.send('CSRF error.');
});

// launch ======================================================================
// Starts the Express server on port 3001 and logs that it has started
const httpsOptions = {
  key: fs.readFileSync('localhost-ssl/key.pem'),
  cert: fs.readFileSync('localhost-ssl/cert.pem')
};

http.createServer(app).listen(app.get('port'), () => {
  console.info(`Express server started at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

https.createServer(httpsOptions, app).listen(8080, () => {
  console.info('Express server started at: https://localhost:8080/'); // eslint-disable-line no-console
});

/*
https.createServer(httpsOptions, app).listen(app.get('port'), () => {
  console.log(`Express server started at: https://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
*/
module.exports = app;

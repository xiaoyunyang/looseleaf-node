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
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';

// import colors from 'colors';

// import enforceSSL from 'express-enforces-ssl';
import helmet from 'helmet';
import ms from 'ms';
import validator from 'validator';
import renderViewMiddleware from '../client/iso-middleware/renderView';

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
  includeSubdomains: true,
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
mongoose.connect(process.env.MONGODB);

// set up ejs for templating
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// required for passport
// TODO: "secret" needs to be secret and a bunch of random characters
app.use(session({
  secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

// Auth ========================================================================
app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require('./auth/routes');
const configPassport = require('./auth/passport.js');

app.use('/auth', authRoutes);
configPassport();


// API =========================================================================
/*
 This is getting sent to localhost:3001/api/hello. In your terminal try:
 $ curl localhost:3001/api/hello
 */
const apiVersion1 = require('./api/api1');

app.use('/api', apiVersion1);

// Guestbook ===================================================================
// TODO: TEST CODE BELOW. Remote for production
// console.log(getInfoFromURL("https://medium.com/@xiaoyunyang")("username"))
// console.log(getInfoFromURL(path)("pathname"))

const entries = [];
let ctr = 0;
app.locals.entries = entries;

app.get('/guestbook', (req, res) => {
  res.render('index');
});
app.get('/guestbook/new-entry', (req, res) => {
  res.render('new-entry');
});

// regex for catching numbers only
app.get(/^\/guestbook\/(\d+)$/, (req, res) => {
  const id = parseInt(req.params[0], 10);
  const entry = entries[id];
  app.locals.entry = entry;
  res.render('entry');
});

app.post('/guestbook/new-entry', (req, res) => {
  if (!req.body.title || !req.body.body) {
    res.status(400).send('Entries must have a title and a body.');
    return;
  }
  entries.push({
    id: ctr,
    title: req.body.title,
    content: req.body.body,
    published: new Date(),
  });
  ctr += 1;

  res.redirect('/guestbook');
});


// Serve Static ================================================================
// Serve static file
// Try: http://localhost:3001/static/cat.png
// Try:  http://localhost:3001/static/resume.png

/* If we don't comment this out, integration with frontend won't work...Not sure why.
app.use('/static', (req, res, next) => {
  const filePath = path.join(__dirname, 'static', req.url);
  if (req.url === '/resume.pdf') {
    res.status(403).send(`${req.url}  is Forbidden resource`);
  }
  res.sendFile(filePath, (err) => {
    if (err) {
      next(new Error('Error sending file!'));
    }
  });
});

*/
// Integration with Frontend ===================================================
// Express only serves static assets in production

if (process.env.NODE_ENV === 'production') {
  const clientAppPathProd = path.join(path.resolve('.'), '/client/build');
  // console.log('Running in production mode');
  // The below code allows client app to run from the the server (localhost:3001)
  app.use('/', express.static(clientAppPathProd));


/*  app.use(express.static(path.join(path.resolve("."), '/client/build')))
  app.get('/', function (req, res) {
    res.sendFile(path.join(path.resolve("."), '/client/build', 'index.html'))
  })
*/
} else if (process.env.NODE_ENV === 'development') {
  const clientAppPathDev = path.join(path.resolve('.'), '/client/public');
  // console.log('Running in development mode')

  /*
  TODO: Integrate server with client when env is development
  Add logic here for server to log routes managed by client code. See
  https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/
  The below code is temporary, copied from the the case when env is production.
  */

  app.use('/', express.static(clientAppPathDev));
}

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


// Isomorphic Webapp ===========================================================

// handle the isomorphic page render
app.get('/iso', renderViewMiddleware);
// setup static files, server browser.js (webpacked file) from root
app.use(express.static(__dirname));


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
  cert: fs.readFileSync('localhost-ssl/cert.pem'),
};

http.createServer(app).listen(app.get('port'), () => {
  // console.log(colors.green('hello'));
  console.log(`Express server started at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

https.createServer(httpsOptions, app).listen(8080, () => {
  console.log('Express server started at: https://localhost:8080/'); // eslint-disable-line no-console
});

/*
https.createServer(httpsOptions, app).listen(app.get('port'), () => {
  console.log(`Express server started at: https://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
*/
module.exports = app;

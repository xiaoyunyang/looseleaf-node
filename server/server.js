// Set up ======================================================================
// get all the tools we need
import express from 'express';
import http from 'http';
import logger from 'morgan';

import path from 'path';
import renderViewMiddleware from '../client/iso-middleware/renderView';

require('dotenv').config();

// Configuration ===============================================================
const app = express();
app.set('port', process.env.PORT || 8080);
app.use(logger('short'));

// API =========================================================================
/*
 This is getting sent to localhost:3001/api/hello. In your terminal try:
 $ curl localhost:3001/api/hello
 */
const apiVersion1 = require('./api/api1');

app.use('/api', apiVersion1);

// Integration with Frontend ===================================================
// Express only serves static assets in production
const clientAppPath = path.join(path.resolve('.'), '/client/build');
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(clientAppPath));
} else if (process.env.NODE_ENV === 'development') {
  app.use('/', express.static(clientAppPath));
}

// Isomorphic Webapp ===========================================================
// handle the isomorphic page render
app.get('/iso', renderViewMiddleware);
// setup static files, server browser.js (webpacked file) from root
app.use(express.static(__dirname));


// launch ======================================================================
// Starts the Express server on port 3001 and logs that it has started
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server started at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

module.exports = app;

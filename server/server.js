"use strict";

import express from  'express'
import logger from 'morgan'
import getInfoFromURL from './modules/getInfoFromURL'
import path from 'path'
import bodyParser from 'body-parser'

require('dotenv').config()

// Set up ======================================================================
// get all the tools we need
const app = express()
app.set("port", process.env.PORT || 3001);
app.use(logger("short"))

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  let path = path.join(path.resolve("./"), 'client/build')
  app.use(express.static(path))
}

// The below code allows client app to run from the the server (localhost:3001)
app.use(express.static(path.join(path.resolve("."), '/client/build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(path.resolve("."), '/client/', 'index.html'))
})

/*
 This is getting sent to localhost:3001/api/hello. In your terminal try:
 $ curl localhost:3001/api/hello
 */
app.get('/api/hello', (req, res) => {
  res.send({ express: 'If you are seeing this, your frontend react app is hooked up to your backend Express app. CONGRATULATIONS!' });
})
app.get("/api/hello/@:who", function(req, res) {
  res.end("Hello, " + req.params.who + ".");
  // Fun fact: this has some security issues, which we’ll get to!
});
app.get('/api/goodbye', (req, res) => {
  res.send({ express: 'Goodbye!' });
})


//TODO: Add Auth stuff here
app.get('/auth/facebook/callback', (res, resp) => {
  resp.statusCode = 404;
  resp.end("Facebook Callback page with status code"+ resp.statusCode)
})

/*
TODO: Add logic here for server to log routes managed by client code. See
https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/
*/



// TODO: TEST CODE BELOW. Remote for production
console.log(getInfoFromURL("https://medium.com/@xiaoyunyang")("username"))
//console.log(getInfoFromURL(path)("pathname"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// launch ======================================================================
// Starts the Express server on port 3001 and logs that it has started
app.listen(app.get("port"), () => {
  console.log(`Express server started at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
})

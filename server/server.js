"use strict";

import express from  'express'
import logger from 'morgan'
import getInfoFromURL from './modules/getInfoFromURL'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'

require('dotenv').config()

// Set up ======================================================================
// get all the tools we need
const app = express()
app.set("port", process.env.PORT || 3001)
app.use(logger("short"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Integration with Frontend ===================================================
// Express only serves static assets in production

if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode")

  // The below code allows client app to run from the the server (localhost:3001)
  app.use(express.static(path.join(path.resolve("."), '/client/build')))
  app.get('/', function (req, res) {
    res.sendFile(path.join(path.resolve("."), '/client/', 'index.html'))
  })
} else if(process.env.NODE_ENV == "development") {
  console.log("Running in development mode")

  /*
  TODO: Integrate server with client when env is development
  Add logic here for server to log routes managed by client code. See
  https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/
  The below code is temporary, copied from the the case when env is production.
  */
  app.use(express.static(path.join(path.resolve("."), '/client/build')))
  app.get('/', function (req, res) {
    res.sendFile(path.join(path.resolve("."), '/client/', 'index.html'))
  })
}


// API =========================================================================
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

// Auth ========================================================================
//TODO: Add Auth stuff here
app.get('/auth/facebook/callback', (res, resp) => {
  resp.statusCode = 404;
  resp.end("Facebook Callback page with status code"+ resp.statusCode)
})


// Test code ===================================================================
// TODO: TEST CODE BELOW. Remote for production
//console.log(getInfoFromURL("https://medium.com/@xiaoyunyang")("username"))
//console.log(getInfoFromURL(path)("pathname"))

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

let entries = [];
app.locals.entries = entries;

app.get("/guestbook", (request, response) => {
  response.render("index");
});
app.get("/guestbook/new-entry", (request, response) => {
  response.render("new-entry");
});

app.post("/guestbook/new-entry", (request, response) => {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  console.log(entries)
  response.redirect("/guestbook");
});

// Serve static file
//Try: http://localhost:3001/cat.png
//Try:  http://localhost:3001/resume.png


app.use('/static', (req, res, next) => {
  const filePath = path.join(__dirname, "static", req.url);

  res.sendFile(filePath, (err) => {
    if(err) {
      next(new Error("Error sending file!"));
    }
  })
})


// Error Handler ===============================================================
//Renders a 404 page because you’re requesting an unknown source

// middleware that logs the error
app.use((err, req, res, next) => {
  console.error(err)
  next(err)
})

// middleware that logs all errors
app.use((err, req, res, next) => {
  res.status(500);
  res.send("Internal server error.");
})






// launch ======================================================================
// Starts the Express server on port 3001 and logs that it has started
app.listen(app.get("port"), () => {
  console.log(`Express server started at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
})

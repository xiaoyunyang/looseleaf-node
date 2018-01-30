"use strict";

// Set up ======================================================================
// get all the tools we need
import express from  'express'
import logger from 'morgan'
import getInfoFromURL from './modules/getInfoFromURL'
import path from 'path'
import bodyParser from 'body-parser'
//import fs from 'fs'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'

require('dotenv').config()


// Configuration ===============================================================
const app = express()
app.set("port", process.env.PORT || 8080)
app.use(logger("short"))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// connect to our database
mongoose.connect(process.env.MONGODB)

// set up ejs for templating
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

// required for passport
// TODO: "secret" needs to be secret and a bunch of random characters
app.use(session({
  secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash()) // use connect-flash for flash messages stored in session

// Auth ========================================================================
app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require("./auth/routes")
const configPassport = require ('./auth/passport.js')

app.use('/auth', authRoutes);
configPassport()


// API =========================================================================
/*
 This is getting sent to localhost:3001/api/hello. In your terminal try:
 $ curl localhost:3001/api/hello
 */
const apiVersion1 = require("./api/api1");
app.use("/api", apiVersion1)

// Guestbook ===================================================================
// TODO: TEST CODE BELOW. Remote for production
//console.log(getInfoFromURL("https://medium.com/@xiaoyunyang")("username"))
//console.log(getInfoFromURL(path)("pathname"))

let entries = []
let ctr = 0
app.locals.entries = entries;

app.get("/guestbook", (req, res) => {
  res.render("index")
});
app.get("/guestbook/new-entry", (req, res) => {
  res.render("new-entry")
});

// regex for catching numbers only
app.get(/^\/guestbook\/(\d+)$/, (req, res) => {
  let id = parseInt(req.params[0], 10);
  let entry = entries[id]
  app.locals.entry = entry;
  res.render("entry")
})

app.post("/guestbook/new-entry", (req, res) => {
  if (!req.body.title || !req.body.body) {
    res.status(400).send("Entries must have a title and a body.")
    return;
  }
  entries.push({
    id: ctr,
    title: req.body.title,
    content: req.body.body,
    published: new Date()
  });
  ctr = ctr + 1
  console.log(entries)
  res.redirect("/guestbook")
})


// Serve Static ================================================================
// Serve static file
//Try: http://localhost:3001/static/cat.png
//Try:  http://localhost:3001/static/resume.png

app.use('/static', (req, res, next) => {
  const filePath = path.join(__dirname, "static", req.url)
  console.log(req.url)

  if(req.url === '/resume.pdf') {
    res.status(403).send(req.url + " is Forbidden resource")
  }

  res.sendFile(filePath, (err) => {
    if(err) {
      next(new Error("Error sending file!"))
    }
  })
})
// Integration with Frontend ===================================================
// Express only serves static assets in production
const clientAppPath = path.join(path.resolve("."), '/client/build')
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode")
  // The below code allows client app to run from the the server (localhost:3001)
  app.use('/', express.static(clientAppPath))


/*  app.use(express.static(path.join(path.resolve("."), '/client/build')))
  app.get('/', function (req, res) {
    res.sendFile(path.join(path.resolve("."), '/client/build', 'index.html'))
  })*/
} else if(process.env.NODE_ENV === "development") {
  console.log("Running in development mode")

  /*
  TODO: Integrate server with client when env is development
  Add logic here for server to log routes managed by client code. See
  https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/
  The below code is temporary, copied from the the case when env is production.
  */

  app.use('/', express.static(clientAppPath))
}

// Error Handler ===============================================================

// middleware that logs the error
app.use((err, req, res, next) => {
  console.error(err)
  next(err)
})

// middleware that responds to the 404 error
// The 404 error is associated with a GET request failure
app.use((req, res) => {
  res.status(404).render("404");
  //alternative:
  //res.status(404).json({ error: "Resource not found!" });
})

app.use((req, res) => {
  res.status(403).send("Forbidden resource")
})


// middleware that responds to the 500 error
// The 500 error is associated with a requesting a file that does not exist
app.use((err, req, res, next) => {
  res.status(500).send("Internal server error: "+ err)
})

// launch ======================================================================
// Starts the Express server on port 3001 and logs that it has started
app.listen(app.get("port"), () => {
  console.log(`Express server started at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
})

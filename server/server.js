const express = require('express')
const logger = require('morgan')
const getInfoFromURL = require('./modules/getInfoFromURL')
const path = require("path")

// Set up ======================================================================
// get all the tools we need
const app = express()
app.set("port", process.env.PORT || 3001);
app.use(logger("short"))

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

/*
 This is getting sent to localhost:3001/api/hello. In your terminal try:
 $ curl localhost:3001/api/hello
 */
app.get('/api/hello', (req, res) => {
  res.send({ express: 'If you are seeing this, your frontend react app is hooked up to your backend Express app. CONGRATULATIONS!' });
});
app.get('/api/goodbye', (req, res) => {
  res.send({ express: 'Goodbye!!' });
});


// The below code allows client app to run from the the server (localhost:3001)
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/', 'index.html'));
});

/*
TEST CODE BELOW
 */
console.log(getInfoFromURL("https://medium.com/@xiaoyunyang")("username"))
//console.log(getInfoFromURL(path)("pathname"))

// launch ======================================================================
// Starts the Express server on port 3001 and logs that it has started
app.listen(app.get("port"), () => {
  console.log(`Express server started at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
})

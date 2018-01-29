// routes/api1.js
// caller: server.js
// All the routes for version 1 of our api

import express from  'express'

const api = express.Router()

api.get('/hello', (req, res) => {
  res.send({ express: 'If you are seeing this, your frontend react app is hooked up to your backend Express app. CONGRATULATIONS!' });
})
api.get("/hello/@:who", function(req, res) {
  res.end("Hello, " + req.params.who + ".");
  // Fun fact: this has some security issues, which we’ll get to!
});
api.get('/goodbye', (req, res) => {
  res.send({ express: 'Goodbye!' });
})
api.get("/random/:min/:max", (req, res) => {
  let min = parseInt(req.params.min)
  let max = parseInt(req.params.max)
  if (isNaN(min) || isNaN(max)) {
    res.status(400);
    res.json({ error: "Bad request." });
    return
  }
  let result = Math.round((Math.random() * (max - min)) + min);
  res.json({ result: result });
})

module.exports = api

// routes/api1.js
// caller: server.js
// All the routes for version 1 of our api

import express from 'express';
import fs from 'fs';
import path from 'path';

const api = express.Router();

api.get('/hello', (req, res) => {
  res.send({ express: 'If you are seeing this, your frontend react app is hooked up to your backend Express app. CONGRATULATIONS!' });
});

api.get('/hello/@:who', (req, res) => {
  res.send(`Hello, ${req.params.who}.`);
  // Fun fact: this has some security issues, which we’ll get to!
});

api.get('/recipes', (req, res) => {
  // Read and open the recipes json file
  const filePath = path.join(__dirname, '../data/recipes.json');
  fs.readFile(filePath, 'utf8', (err, data) => {

    // Error handling - return an error
    if (err) {
      res.status(500).end();
      return console.error(err);
    }
    const recipes = JSON.parse(data);
    res.status(200).send({ recipes });
  });
});
api.get('/featured', (req, res) => {
  // Read and open the featured recipe json file
  const filePath = path.join(__dirname, '../data/featured.json');
  fs.readFile(filePath, 'utf8', (err, data) => {

    // Error handling - return an error
    if (err) {
      res.status(500).end();
      return console.error(err);
    }
    const recipe = JSON.parse(data);
    res.status(200).send({ recipe });
  });
});

api.use('/assets', (req, res, next) => {
  const filePath = path.join(__dirname, '../assets', req.url);
  res.sendFile(filePath, (err) => {
    if (err) {
      next(new Error('Error sending file!'));
    }
  });
});

module.exports = api;

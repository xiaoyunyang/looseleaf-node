// routes/api1.js
// caller: server.js
// All the routes for version 1 of our api

import express from 'express';
import arrayWrap from 'arraywrap';
import fs from 'fs';
import chalk from 'chalk';
import validator from 'validator';
import path from 'path';
import User from '../models/User';
import Project from '../models/Project';
import urlSlug from '../modules/urlSlug';
import dataPreloading from '../../client/iso-middleware/dataPreloading'

const cuid = require('cuid');

const api = express.Router();


/*
TODO: code below is for development only. Remove for production
 */

api.get('/test', (req, res) => {
  const slug = cuid.slug();

  const title = "<>/I'm a little Tea---Pot Short & Stout";
  const sanitizedTitle = validator.escape(title);
  const output = urlSlug(title, slug);
  res.send(`url: ${output} \n santizedTitle: ${sanitizedTitle}`);
});


// Projects ======================================================================
api.post('/project', (req, res, next) => {
  const formFields = req.body.formFields;

  console.log(chalk.blue('formFields', req.body.formFields));
  console.log(chalk.blue('username', req.body.userId));
  // Do some error checking
  if (validator.isEmpty(formFields.title)) {
    res.statusMessage = 'error';
    return res.send('Project must have a title!');
  }
  console.log(chalk.blue(formFields.title))


  // Add new project to database
  const newProject = new Project();
  const slug = urlSlug(formFields.title, cuid.slug());

  newProject.creator = {
    userId: req.body.userId,
    about: validator.escape(formFields.aboutMe),
    mission: validator.escape(formFields.mission)
  };

  newProject.title = validator.escape(formFields.title);
  newProject.urlSlug = slug;
  newProject.desc = validator.escape(formFields.desc);
  newProject.projectType = formFields.projectType;
  newProject.tags = formFields.selectedTags;
  newProject.contributors = formFields.contributors;
  newProject.submission = {
    platform: formFields.selectedPlatform,
    instruction: validator.escape(formFields.submissionInst)
  };
  newProject.dueDate = formFields.dueDate;
  newProject.save(next);
  return res.send(slug);
});


api.get('/project', (req, res) => {
  Project.find({}, (err, projects) => {
    res.send(projects);
  });
});
api.get('/project/:urlSlug', (req, res) => {
  Project.find({ urlSlug: req.params.urlSlug }, (err, project) => {
    if (err) {
      req.flash('error', 'No project found');
      res.statusMessage = 'error';
      return res.send('No project found');
    }
    // If there's no error, send project if project exists
    // NOTE project is an Array containing one element.
    if (project) {
      return res.send(project);
    }
  });
});

// Users ======================================================================
api.get('/user', (req, res) => {
  User.find({}, (err, users) => {
    const usersOut = [];

    users.forEach((user) => {
      const userInfo = {
        username: user.username,
        displayName: user.displayName,
        picture: user.picture
      };
      usersOut.push(userInfo);
    });

    res.send(usersOut);
  });
});

api.get('/hello', (req, res) => {
  res.send({ express: 'If you are seeing this, your frontend react app is hooked up to your backend Express app. CONGRATULATIONS!' });
});

api.get('/hello/@:who', (req, res) => {
  res.send(`Hello, ${req.params.who}.`);
  // Fun fact: this has some security issues, which we’ll get to!
});
// http://localhost:3001/api/search?q=hello+world
// http://localhost:3001/api/search?q=abc+123&q=hello+world&q=xyz
// if someone gives you more queries than you expect,
// you just take the first one and ignore the rest.
api.get('/search', (req, res) => {
  const search = arrayWrap(req.query.q || '');
  const terms = search[0].split(' ');
  res.send(terms);
});

api.get('/goodbye', (req, res) => {
  res.send({ express: 'Goodbye!' });
});
api.get('/random/:min/:max', (req, res) => {
  const min = parseInt(req.params.min, 10);
  const max = parseInt(req.params.max, 10);
  if (Number.isNaN(min) || Number.isNaN(max)) {
    res.status(400);
    res.json({ error: 'Bad request.' });
    return;
  }
  const result = Math.round((Math.random() * (max - min)) + min);
  res.json({ result });
});

api.get('/hello-recipe', dataPreloading);

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
      console.error(err);
    }
    const recipe = JSON.parse(data);
    res.status(200).send({ recipe });
  });
});
api.get('/projects/todos', (req, res) => {
  // Read and open the recipes json file
  const filePath = path.join(__dirname, '../data/recipes.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    // Error handling - return an error
    if (err) {
      res.status(500).end();
      return console.error(err);
    }
    const newProjects = JSON.parse(data);
    res.status(200).send({ newProjects });
  });
});
api.get('/projects/completed', (req, res) => {
  // Read and open the featured recipe json file
  const filePath = path.join(__dirname, '../data/featured.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    // Error handling - return an error
    if (err) {
      res.status(500).end();
      console.error(err);
    }
    const completedProjects = JSON.parse(data);
    res.status(200).send({ completedProjects });
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

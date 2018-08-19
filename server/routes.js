// routes/routes.js
// caller: server.js
// All the routes for authentication

import express from 'express';
import passport from 'passport';
import validator from 'validator';
import csrf from 'csurf';
import gravatarUrl from 'gravatar-url';
import User from './models/User';
import Project from './models/Project';
import chalk from 'chalk';
import renderLandingAppMiddleware from '../client/iso-middleware/renderLandingApp';
import renderUserAppMiddleware from '../client/iso-middleware/renderUserApp';
import renderCommunityUserAppMiddleware from '../client/iso-middleware/renderCommunityUserApp';
import renderCommunityGuestAppMiddleware from '../client/iso-middleware/renderCommunityGuestApp';
import renderProjectAppMiddleware from '../client/iso-middleware/renderProjectApp';
import renderProjectPageMiddleware from '../client/iso-middleware/renderProjectPage';

const community = require('./data/community.json');

const router = express.Router();

// Passing data to views
// Passport populates req.user for you
router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

// Render Apps ================================================================
// Important: this has to remain at the bottom of the page because it's a wildcard
// catch-all case
// Gotcha: Order of code matters in determining middleware for the requested route

router.get('/community/:name*', (req, res, next) => {
  if (req.isAuthenticated()) {
    renderCommunityUserAppMiddleware(req, res, next, community[req.params.name]);
  }
  renderCommunityGuestAppMiddleware(req, res, next, community[req.params.name]);
});
router.get('/project/edit*', (req, res, next) => {
  if (req.isAuthenticated()) {
    renderProjectAppMiddleware(req, res, next);
  }
  renderLandingAppMiddleware(req, res, next);
});
router.get('/project/:slug*', (req, res, next) => {
  // First find if a project with req.params.slug exists in the Project collection
  // If not ...
  Project.findOne({ urlSlug: req.params.slug }, (err, project) => {
    if (err) { return next(err); }
    if (!project) {
      return renderLandingAppMiddleware(req, res, next);
    }

    if (req.isAuthenticated()) {
      return renderProjectAppMiddleware(req, res, next);
    }
    return renderProjectPageMiddleware(req, res, next, project);
  });
});

router.get('/*', (req, res, next) => {
  if (req.isAuthenticated()) {
    renderUserAppMiddleware(req, res, next);
  }
  renderLandingAppMiddleware(req, res, next);
});


module.exports = router;

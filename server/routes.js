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
import Post from './models/Post';
import chalk from 'chalk';
import renderLandingAppMiddleware from '../client/iso-middleware/renderLandingApp';
import renderUserAppMiddleware from '../client/iso-middleware/renderUserApp';
import renderUserPageMiddleware from '../client/iso-middleware/renderUserPage';
import renderCommunityUserAppMiddleware from '../client/iso-middleware/renderCommunityUserApp';
import renderCommunityGuestAppMiddleware from '../client/iso-middleware/renderCommunityGuestApp';
import renderProjectPageMiddleware from '../client/iso-middleware/renderProjectPage';
import renderExploreAppMiddleware from '../client/iso-middleware/renderExploreApp';
import renderPostAppMiddleware from '../client/iso-middleware/renderPostApp';

const community = require('../client/src/shared/data/community.json');

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
  const isAuthenticated = req.isAuthenticated();
  const isValidCommunity = community[req.params.name];

  if (isValidCommunity && isAuthenticated) {
    renderCommunityUserAppMiddleware(req, res, next, community[req.params.name]);
  } else if (!isValidCommunity && isAuthenticated) {
    renderUserAppMiddleware(req, res, next);
  } else if (isValidCommunity && !isAuthenticated) {
    renderCommunityGuestAppMiddleware(req, res, next, community[req.params.name]);
  } else if (!isAuthenticated && !isValidCommunity) {
    return renderLandingAppMiddleware(req, res, next);
  }
});
router.get('/project/edit/new', (req, res, next) => {
  if (req.isAuthenticated()) {
    return renderProjectPageMiddleware(req, res, next, { title: 'new project', slug: 'new' });
  }
  renderLandingAppMiddleware(req, res, next);
});
router.get('/project/edit/:slug', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return renderLandingAppMiddleware(req, res, next);
  }
  // If user is loggedin is authenticated
  Project.findOne({ slug: req.params.slug }, (err, project) => {
    if (err) { return next(err); }
    // If project doesn't exist, have landingApp render NotFound page
    if (!project) {
      return renderLandingAppMiddleware(req, res, next); // This will display the NotFound page
    }
    // If project is found, render only render project edit page if the logged in user
    // is the same as the project creator. Otherwise, have the UserApp render the NotFound page
    if (req.isAuthenticated() && req.user._id.equals(project.postedBy)) {
      return renderProjectPageMiddleware(req, res, next, project);
    }
    return renderUserAppMiddleware(req, res, next);
  });
});
router.get('/project/:slug*', (req, res, next) => {
  // First find if a project with req.params.slug exists in the Project collection
  // If not ...
  Project.findOne({ slug: req.params.slug }, (err, project) => {
    if (err) { return next(err); }
    if (!project) {
      return renderLandingAppMiddleware(req, res, next); // This will display the NotFound page
    }
    return renderProjectPageMiddleware(req, res, next, project);
  });
});
router.get('/explore/:toExplore*', (req, res, next) => {
  return renderExploreAppMiddleware(req, res, next);
});
router.get('/post/:postId*', (req, res, next) => {
  Post.findOne({ _id: req.params.postId }, (err, post) => {
    if (err) { return next(err); }
    if (!post) {
      return renderLandingAppMiddleware(req, res, next); // This will display the NotFound page
    }
    return renderPostAppMiddleware(req, res, next, post);
  });
});
router.get('/@:username*', (req, res, next) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) { return next(err); }
    if (!user) {
      return renderLandingAppMiddleware(req, res, next);
    }
    if (req.isAuthenticated() && req.user._id.equals(user._id)) {
      return renderUserAppMiddleware(req, res, next);
    }
    return renderUserPageMiddleware(req, res, next, user);
  });
});

router.get('/*', (req, res, next) => {
  if (req.isAuthenticated()) {
    renderUserAppMiddleware(req, res, next);
  }
  renderLandingAppMiddleware(req, res, next);
});


module.exports = router;

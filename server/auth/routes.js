// routes/routes.js
// caller: server.js
// All the routes for authentication

import express from 'express';
import passport from 'passport';
import validator from 'validator';
import csrf from 'csurf';
import gravatarUrl from 'gravatar-url';
import User from '../models/User';
import chalk from 'chalk';

const router = express.Router();
// TODO: csrf commented out so client app can post. Need to figure out use
// csrf with the client app
// router.use(csrf());

// Middleware ==================================================================
// route middleware to make sure a user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(chalk.green('is authenticated!'))
    next();
  } else {
    req.flash('info', 'You must be logged in to see this page.');
    res.redirect('/login'); // NOTE: this gets routed to /auth/login by LandingAppMiddleware
  }
}

// TODO: Sanitize all inputs

// Passing data to views
// Passport populates req.user for you
router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

// List User(s) ================================================================
// TODO: Do we need the code below? That can be deleted.

// returns all the users, newest one first
// TODO: change the following URI to /auth/user
router.get('/users', (req, res, next) => {
  User.find()
    .sort({ createdAt: 'descending' })
    .exec((err, users) => {
      if (err) { return next(err); }
      return res.render('users', { users });
    });
});

// TODO: change the following URI to /auth/user/:username
router.get('/users/:username', (req, res, next) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) { return next(err); }
    if (!user) { return next(404); }
    return res.render('profile', { user });
  });
});

// Local Signup ================================================================
// Saves user to the database
// TODO: Do I really need to code below?
// router.get('/signup', (req, res) => {
//   res.render('signup', {
//     // csrfToken: req.csrfToken()
//   });
// });

// NOTE POST '/auth/signup' and POST '/auth/login' are handled by LandingAppMiddleware
router.post('/signup', (req, res, next) => {
  // body-parser adds the username and password to req.body
  const email = req.body.email;
  const password = req.body.password;

  // Calls findOne to return just one user. You want a match on usernames here
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    // If user already exists ...
    if (user) {
      console.log(chalk.red('error: user already exists'));
      req.flash('error', 'User already exists');
      res.statusMessage = 'error';
      return res.send('User already exists');
    }
    // Else if user does not exist, Let's create new user

    // but first, we need to validate input:
    if (!validator.isEmail(email)) {
      res.statusMessage = 'error';
      return res.send('Please provide a valid email');
    }
    if (validator.isEmpty(password)) {
      res.statusMessage = 'error';
      return res.send('Please provide a password');
    }

    const newUser = new User();
    newUser.email = email;

    // Error checking for email to make sure it is an email...
    newUser.lastLoggedIn = new Date();
    newUser.local.password = password;
    // TODO: newUser.picture = Gravatar
    newUser.picture = gravatarUrl(email, { size: 120, default: 'mm' });
    const username = email.split('@')[0];
    newUser.displayName = username;
    const regex = new RegExp(`^${username}.*$`, 'i');

    // TODO: don't user User.count. If you logged in with facebook, with username
    // xiaoyunyang, then logged in with github, which created another user with
    // same username, but called xiaoyunyang-1, then deleted the facebook account,
    // then created the facebook account again, you won't be able to create an
    // account due to duplicate key (xiaoyunyang-1).
    // What we want to do is to find the largest number following the username
    // and append that to the end of the new username (xiaoyunyang-2)

    User.count({ username: regex }, (err2, c) => {
      if (err2) {
        return next(err2);
      }
      const append = (c === 0) ? '' : `-${c}`;
      newUser.username = username + append;
      newUser.save(next);
    });
  });
}, passport.authenticate('login-local', {
  successRedirect: '/',
  failureRedirect: '/login', // I don't think we ever get here...
  failureFlash: true
}));

// Local Login ==================================================================
router.post('/login', (req, res, next) => {
  passport.authenticate('login-local',
    (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        res.statusMessage = 'error';
        return res.send(info.message);
      }
      return req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        user.set({
          lastLoggedIn: new Date()
        });
        user.save(next);
        res.statusMessage = 'OK'; // NOTE: res.statusMessage is seen by axios as res.statusText
        return res.send('OK'); // NOTE: axios sees this data as res.data
      });
    })(req, res, next);
});

// Facebook ====================================================================
// NOTE: The code below has this error:
// UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]:
// Cannot set headers after they are sent to the client
// (node:92442) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]:
// Cannot set headers after they are sent to the client
router.get('/facebook', (req, res, next) => {
  req.session.redirect = req.query.redirPath;
  console.log(chalk.green('redirPath', req.query.redirPath))
  passport.authenticate('facebook')(req, res, next)
});

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect
    const redirPath = req.session.redirect
    delete req.session.redirect;
    res.redirect(redirPath);
  });

// Github =====================================================================
router.get('/github', (req, res, next) => {
  req.session.redirect = req.query.redirPath;
  passport.authenticate('github')(req, res, next)
});

// handle the callback after github has authenticated the user
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect
    const redirPath = req.session.redirect
    delete req.session.redirect;
    res.redirect(redirPath);
  });

// Delete ======================================================================
// Delete user from the database
router.post(
  '/delete/:username',
  ensureAuthenticated,
  (req, res, next) => {
    User.findOneAndRemove({ username: req.params.username }, (err, user) => {
      if (err) {
        req.flash('error', 'No user found');
        res.statusMessage = 'error';
        return res.send('No user found');
        //return next(err);
      }
      // If user successfully deleted
      if (user) {
        req.flash('info', 'User deleted!');
        res.statusMessage = 'info';
        return res.send('User deleted!');
      }
      req.flash('error', 'No user found');
      res.statusMessage = 'error';
      return res.send('No user found');

      // return res.redirect('/auth/users');
    });
  },
);

// Logout ======================================================================
// Passport populates req.user for you
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(req.query.redirPath);
});

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

// edit ========================================================================
// Passport populates req.user for you
router.get('/edit', ensureAuthenticated, (req, res) => {
  res.render('edit', {
    csrfToken: req.csrfToken()
  });
});
router.get('/edit-csrf', ensureAuthenticated, (req, res) => {
  res.render('edit-csrf');
});

router.post('/edit', ensureAuthenticated, (req, res, next) => {
  req.user.displayName = req.body.displayname;
  req.user.location = req.body.location;
  req.user.bio = req.body.bio;
  req.user.save((err) => {
    if (err) {
      next(err);
      return;
    }
    req.flash('info', 'Profile updated!');
    res.statusMessage = 'info';
    res.send('Profile updated!');
    res.redirect(`/auth/users/${req.user.username}`);
  });
});


module.exports = router;

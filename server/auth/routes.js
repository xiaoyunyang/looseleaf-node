// routes/routes.js
// caller: server.js
// All the routes for authentication

import express from 'express';
import passport from 'passport';
import User from './User';

const router = express.Router();

// Middleware ==================================================================
// route middleware to make sure a user is authenticated
/**
 * [ensureAuthenticated description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('info', 'You must be logged in to see this page.');
    res.redirect('/auth/login');
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
// returns all the users, newest one first
router.get('/', (req, res, next) => {
  User.find()
    .sort({ createdAt: 'descending' })
    .exec((err, users) => {
      if (err) { return next(err); }
      return res.render('users', { users });
    });
});

router.get('/users/:username', (req, res, next) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) { return next(err); }
    if (!user) { return next(404); }
    return res.render('profile', { user });
  });
});

// Facebook=====================================================================
router.get('/facebook', passport.authenticate('facebook'));

// handle the callback after facebook has authenticated the user
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/auth/',
    failureRedirect: '/auth/login',
  }),
);

// Github =====================================================================
router.get('/github', passport.authenticate('github'));

// handle the callback after facebook has authenticated the user
router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: '/auth/',
    failureRedirect: '/auth/login',
  }),
);


// Delete ======================================================================
// Delete user from the database
router.post(
  '/delete/:username',
  ensureAuthenticated,
  (req, res, next) => {
    User.findOneAndRemove({ username: req.params.username }, (err, user) => {
      if (err) {
        req.flash('error', 'No user found');
        return next(err);
      }
      // If user successfully deleted
      if (user) {
        req.flash('info', 'User deleted!');
      }
      req.flash('error', 'No user found');
      return res.redirect('/auth/');
    });
  },
);


// Signup ======================================================================
// Saves user to the database
router.get('/signup', (req, res) => {
  res.render('signup');
});

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
      req.flash('error', 'User already exists');
      return res.redirect('/auth/signup');
    }

    // Else if user does not exist, Let's create new user
    const newUser = new User();
    newUser.email = email;
    newUser.local.password = password;
    const username = email.split('@')[0];
    const regex = new RegExp(`^${username}.*$i`);

    return User.count({ username: regex }, (err2, c) => {
      if (err2) {
        return next(err2);
      }
      const append = (c === 0) ? '' : `-${c}`;
      newUser.username = username + append;
      newUser.save(next);
      return next();
    });
  });
}, passport.authenticate('login-local', {
  successRedirect: '/auth',
  failureRedirect: '/auth/signup',
  failureFlash: true,
}));

// Login ======================================================================
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('login-local', {
  successRedirect: '/auth',
  failureRedirect: '/auth/login',
  failureFlash: true,
}));

// Logout ======================================================================
// Passport populates req.user for you
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth');
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
  res.render('edit');
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
    res.redirect(`/auth/users/${req.user.username}`);
  });
});

module.exports = router;

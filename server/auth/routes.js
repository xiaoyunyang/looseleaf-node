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

import renderLandingAppMiddleware from '../../client/iso-middleware/renderLandingApp';
import renderGuestAppMiddleware from '../../client/iso-middleware/renderGuestApp';
import renderUserAppMiddleware from '../../client/iso-middleware/renderUserApp';
import renderCommunityAppMiddleware from '../../client/iso-middleware/renderCommunityApp';
import renderProjectAppMiddleware from '../../client/iso-middleware/renderProjectApp';

const router = express.Router();
// TODO: csrf commented out so client app can post. Need to figure out use
// csrf with the client app
// router.use(csrf());

// Middleware ==================================================================
// route middleware to make sure a user is authenticated
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
router.get('/auth/users', (req, res, next) => {
  User.find()
    .sort({ createdAt: 'descending' })
    .exec((err, users) => {
      if (err) { return next(err); }
      return res.render('users', { users });
    });
});

router.get('/auth/users/:username', (req, res, next) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) { return next(err); }
    if (!user) { return next(404); }
    return res.render('profile', { user });
  });
});

// Local Signup ================================================================
// Saves user to the database
router.get('/auth/signup', (req, res) => {
  res.render('signup', {
    // csrfToken: req.csrfToken()
  });
});

router.post('/auth/signup', (req, res, next) => {
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
      return res.send('User already exists')
      //return res.redirect('/login');
      // return res.status(404).json("Not Found");
      // return res.redirect('/signup'); // res.redirect('/how-it-works');
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
  failureRedirect: '/login',
  failureFlash: true
}));

// Local Login ==================================================================
router.get('/auth/login', (req, res) => {
  res.render('login', {
    // csrfToken: req.csrfToken()
  });
});

/*
router.post('/auth/login', passport.authenticate('login-local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));
*/
router.post('/auth/login', (req, res, next) => {
  passport.authenticate('login-local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      res.statusMessage = 'error';
      return res.send(info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

// Facebook ====================================================================
router.get('/auth/facebook', passport.authenticate('facebook'));

// handle the callback after facebook has authenticated the user
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
  }),
);

// Github =====================================================================
router.get('/auth/github', passport.authenticate('github'));

// handle the callback after facebook has authenticated the user
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
  }),
);


// Delete ======================================================================
// Delete user from the database
router.post(
  '/auth/delete/:username',
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
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

// edit ========================================================================
// Passport populates req.user for you
router.get('/auth/edit', ensureAuthenticated, (req, res) => {
  res.render('edit', {
    csrfToken: req.csrfToken()
  });
});
router.get('/auth/edit-csrf', ensureAuthenticated, (req, res) => {
  res.render('edit-csrf');
});

router.post('/auth/edit', ensureAuthenticated, (req, res, next) => {
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

const community = (name) => {
  if (name === 'developers') {
    return {
      name: 'developers',
      title: 'Developers',
      desc: 'web and mobile developers'
    };
  } else if (name === 'designers') {
    return {
      name: 'designers',
      title: 'Designers',
      desc: 'web design, UX design, UI design'
    };
  } else if (name === 'illustrators') {
    return {
      name: 'illustrators',
      title: 'Illustrators',
      desc: 'book cover illustration, illustrations for blog'
    };
  } else if (name === 'writers') {
    return {
      name: 'writers',
      title: 'Writers',
      desc: 'copy writer, editor, grant writer, press release writer'
    };
  } else if (name === 'data-scientists') {
    return {
      name: 'data-scientists',
      title: 'Data Scientists',
      desc: 'Analyze and visualize trends in data'
    };
  } else if (name === 'video-producers') {
    return {
      name: 'video-producers',
      title: 'Developer',
      desc: 'Make videos'
    };
  }
  return {
    name: 'misc',
    title: 'Other Creators',
    description: 'comic book writers'
  };
};

// Post Project ================================================================
// router.post('/project/new', ensureAuthenticated, (req, res, next) => {
//   req.user.displayName = req.body.displayname;
//   req.user.location = req.body.location;
//   req.user.bio = req.body.bio;
//   req.user.save((err) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     req.flash('info', 'Profile updated!');
//     res.statusMessage = 'info';
//     res.send('Profile updated!');
//     res.redirect(`/auth/users/${req.user.username}`);
//   });
// });

// Render Apps ================================================================
// Important: this has to remain at the bottom of the page because it's a wildcard
// catch-all case
// Gotcha: Order of code matters in determining middleware for the requested route
router.get('/community/:name*', (req, res, next) => {
  renderCommunityAppMiddleware(req, res, next, community(req.params.name));
});

router.get('/project*', (req, res, next) => {
  if (req.isAuthenticated()) {
    renderProjectAppMiddleware(req, res, next);
  }
  renderLandingAppMiddleware(req, res, next);
});

router.get('/*', (req, res, next) => {
  if (req.isAuthenticated()) {
    renderUserAppMiddleware(req, res, next);
  }
  renderLandingAppMiddleware(req, res, next);
});


module.exports = router;

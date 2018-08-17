// auth/passport.js
// caller: server.js

/* eslint no-underscore-dangle: 0 */

import passport from 'passport';
import crypto from 'crypto';
import validator from 'validator';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GithubStrategy } from 'passport-github';
import User from '../models/User';
import chalk from 'chalk';

const configAuth = require('./secrets');

module.exports = () => {
  // =========================================================================
  // passport session setup ==================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  // serializeUser should turn a user object into an ID.
  // You call done with no error and the user’s ID.
  // =========================================================================
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // deserializeUser should turn the ID into a user object.
  // Once you’ve finished, you call done with any errors and the user object.
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // =========================================================================
  // Local Signup  ============================================================
  // =========================================================================
  passport.use('login-local', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, (req, email, password, done) => {
console.log(chalk.red('post request for login'));
console.log('login-local req.headers', req.headers);
console.log('login-local req.body', req.body);

    // First, perform some validation of the inputs
    if (!validator.isEmail(email)) {
      return done(null, false, { message: 'Please provide a valid email' });
    }

    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(() => {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          // No user has that email...we want to display a generic
          // error message for security sake
          return done(null, false, { message: 'missing credentials' });
        }
        return user.checkPassword(password, (err2, isMatch) => {
          if (err2) { return done(err); }
          if (isMatch) {
            console.log(chalk.green('Login is a success'));
            return done(null, user); // success
          }
          console.log(chalk.red('Invalid password.'));
          // Invalid password...we want to display a generic
          // error message for security sake
          return done(null, false, { message: 'missing credentials' });
        });
      });
    });
  }));

  /* TODO: Fix callback hell / multiple instances of the same boilerplate code
     created to prevent username collision for logging in with different social auth
  */
  /* TODO: If same user has same email from facebook and github, should that person
     be able to create two separate accounts?
  */

  // ===========================================================================
  // Helpers needed for open auth
  // ===========================================================================
  /*
  const createUserName = (username) => {
    const regex = new RegExp(`^${username}.*$`, 'i');
    return User.count({ 'username': regex}, (err, c) => {
      if (err) {
        return '';
      }
      const append = (c === 0) ? '' : `-${c}`;
      return username + append;
    });
  }

  const newSocialUser =(
    count,
    email,
    username,
    displayName,
    picture,
    bio,
    website,
    location,
    gender, hireable) => {
      const newUser = new User();
      newUser.email = email;
      newUser.username = username;
      newUser.displayName = displayName;
      newUser.local.password = crypto.randomBytes(20).toString('hex');
      newUser.gender = gender;
      newUser.location = location;
      newUser.picture = picture;

      return newUser;
    };
*/
  // ===========================================================================
  // Facebook Signup  ==========================================================
  // ===========================================================================
  passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: configAuth.facebookAuth.profileFields
  }, (token, refreshToken, profile, done) => { // facebook will send back the token and profile
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(() => {
      // find the user in the database based on their facebook id
      User.findOne({ 'facebook.id': profile.id }, (err, user) => {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) return done(err);

        // if the user is found, then log them in
        if (user) {
          user.set({
            lastLoggedIn: new Date()
          });
          user.save();
          return done(null, user); // user found, return that user
        }
        // if there is no user found with that facebook id, create them
        const newUser = new User();
        // set all of the facebook information in our user model
        newUser.facebook.id = profile.id; // set the users facebook id
        newUser.facebook.token = token; // we will save the token that facebook provides to the user

        const username = (`${profile.name.givenName}${profile.name.familyName}`).toLowerCase();
        const regex = new RegExp(`^${username}.*$`, 'i');

        User.count({ username: regex }, (err2, c) => {
          if (err2) {
            return done(err2);
          }
          const append = (c === 0) ? '' : `-${c}`;
          newUser.username = username + append;
          newUser.displayName = (`${profile.name.givenName} ${profile.name.familyName}`);
          // facebook can return multiple emails so we'll take the first
          newUser.email = profile.emails[0].value;
          newUser.local.password = crypto.randomBytes(20).toString('hex');
          newUser.gender = profile.gender;
          newUser.location = profile._json.location.name;
          newUser.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          newUser.lastLoggedIn = new Date();
          // save our user to the database
          newUser.save(done);
        });
      });
    });
  }));

  passport.use(new GithubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
    scope: configAuth.githubAuth.scope
  }, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'github.id': profile.id }, (err, user) => {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) return done(err);

        // if the user is found, then log them in
        if (user) {
          user.set({
            lastLoggedIn: new Date()
          });
          user.save();
          return done(null, user); // user found, return that user
        }

        // if there is no user found with that facebook id, create them
        const newUser = new User();
        // set all of the facebook information in our user model
        newUser.github.id = profile._json.id; // set the users facebook id
        newUser.github.token = token;

        const username = profile._json.login;
        const regex = new RegExp(`^${username}.*$`, 'i');

        User.count({ username: regex }, (err2, c) => {
          if (err2) {
            return done(err2);
          }

          const append = (c === 0) ? '' : `-${c}`;
          newUser.username = username + append;
          newUser.email = profile.emails[0].value;
          newUser.location = profile._json.Location;
          newUser.hireable = profile._json.hireable;
          newUser.displayName = profile._json.name;
          newUser.website = profile._json.blog;
          newUser.bio = profile._json.bio;
          newUser.local.password = crypto.randomBytes(20).toString('hex');
          newUser.picture = profile._json.avatar_url;
          newUser.lastLoggedIn = new Date();
          // save our user to the database
          newUser.save(done);
        });
      });
    });
  }));
};

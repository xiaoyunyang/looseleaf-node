// auth/passport.js
// caller: server.js

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import User from './User'
const configAuth = require('./secrets')

module.exports = function() {
  // =========================================================================
  // passport session setup ==================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  // serializeUser should turn a user object into an ID.
  // You call done with no error and the user’s ID.
  // =========================================================================
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  })

  // deserializeUser should turn the ID into a user object.
  // Once you’ve finished, you call done with any errors and the user object.
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  })

  // =========================================================================
  // Local Signup  ============================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  // =========================================================================
  passport.use("login-local", new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email': email }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "No user has that email!" });
          }
          user.checkPassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Invalid password." });
            }
          })
        })
      })
    }
  ))
  passport.use(new FacebookStrategy({
      // pull in our app id and secret from our auth.js file
      clientID        : configAuth.facebookAuth.clientID,
      clientSecret    : configAuth.facebookAuth.clientSecret,
      callbackURL     : configAuth.facebookAuth.callbackURL,
      profileFields   : configAuth.facebookAuth.profileFields
    },
    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {
console.log(profile)
        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err) return done(err);

          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            // set all of the facebook information in our user model
            newUser.facebook.id    = profile.id; // set the users facebook id
            newUser.facebook.token = token; // we will save the token that facebook provides to the user
            newUser.username  = profile.name.givenName + '' + profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
            newUser.local.password = 'password123' // just a default
console.log('MOOOOOO:   We are about to save our user')
            // save our user to the database
            newUser.save(done)
          }
        })
      })
    }
  ))
}

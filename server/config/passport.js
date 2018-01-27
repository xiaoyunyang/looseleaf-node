import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/User'

module.exports = function() {
  // serializeUser should turn a user object into an ID.
  // You call done with no error and the user’s ID.
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

  passport.use("login", new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: "No user has that username!" });
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
  }))
}

// auth/User.js
// callers: auth/routes.js and auth/passport.js
// User model instantiates a mongoose schema

import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true, unique: true },
  displayName: String,
  website: String,
  location: String,
  picture: String,
  bio: String,
  local: {
    email: { type: String, unique: true},
    password: { type: String, required: true },
    passwordResetToken: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String
    },
})

const SALT_FACTOR = 10

// Pre-save action to hash the password
const noop = function() {}

// Defines a function that runs before model is saved
// Gotchas:  don't use fat arrow functtion here
// See: https://github.com/Automattic/mongoose/issues/3333
userSchema.pre("save", function(done) {
  const user = this; // Saves a reference to the user
  if(!user.isModified("local.password")) {

    return done()
  }
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if(err) { return done(err) }
    bcrypt.hash(user.local.password, salt, noop, (err, hashedPassword) => {
      if(err) { return done(err) }
      user.local.password = hashedPassword
      done()
    })
  })
})

// Model methods ===============================================================
userSchema.methods.name = function() {
  return this.displayName || this.username;
}

// Checking the user’s password against hashedPassword
userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.local.password, (err, isMatch) => {
    done(err, isMatch);
  })
}

// Creating and exporting the user model =======================================
const User = mongoose.model('User', userSchema);

module.exports = User;

// auth/User.js
// callers: auth/routes.js and auth/passport.js
// User model instantiates a mongoose schema

import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import mongoosePaginate from 'mongoose-paginate';

// TODO: change field "lastLoggedIn" to "lastLoggedin"
const schema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  lastLoggedIn: { type: Date },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  displayName: String,
  picture: String,
  bio: { type: String, default: '' },
  website: { type: String, default: '' },
  location: { type: String, default: '' },
  hireable: { type: Boolean, default: true },
  projects: { type: Array, default: [] },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
  interests: { type: Array, default: [] },
  communities: Array,
  local: {
    password: { type: String, required: true },
    passwordResetToken: String
  },
  facebook: {
    id: String,
    token: String
  },
  github: {
    id: String,
    token: String
  },
  google: {
    id: String,
    token: String
  }
});

const SALT_FACTOR = 10;

// Pre-save action to hash the password
const noop = () => {};

// Defines a function that runs before model is saved
// Gotchas:  don't use fat arrow functtion here
// See: https://github.com/Automattic/mongoose/issues/3333
schema.pre('save', function (done) {
  const user = this; // Saves a reference to the user
  if (!user.isModified('local.password')) {
    return done();
  }
  return bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) { return done(err); }
    return bcrypt.hash(
      user.local.password, salt, noop,
      (err2, hashedPassword) => {
        if (err2) { return done(err); }
        user.local.password = hashedPassword;
        return done();
      },
    );
  });
});

// Model methods ===============================================================
schema.methods.name = function () {
  return this.displayName || this.username;
};

// Checking the user’s password against hashedPassword
schema.methods.checkPassword = function (guess, done) {
  bcrypt.compare(guess, this.local.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

schema.plugin(mongoosePaginate);

// Creating and exporting the user model =======================================
const User = mongoose.model('User', schema);

module.exports = User;

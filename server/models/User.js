import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  displayName: String,
  bio: String
})

const SALT_FACTOR = 10

// Pre-save action to hash the password
const noop = function() {}

// Defines a function that runs before model is saved
// Gotchas:  don't use fat arrow functtion here
// See: https://github.com/Automattic/mongoose/issues/3333
userSchema.pre("save", function(done) {
  const user = this; // Saves a reference to the user
  if(!user.isModified("password")) {

    return done()
  }
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if(err) { return done(err) }
    bcrypt.hash(user.password, salt, noop, (err, hashedPassword) => {
      if(err) { return done(err) }
      user.password = hashedPassword
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
  bcrypt.compare(guess, this.password, (err, isMatch) => {
    done(err, isMatch);
  })
}

// Creating and exporting the user model =======================================
const User = mongoose.model('User', userSchema);

module.exports = User;

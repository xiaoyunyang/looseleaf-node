import express from 'express'
import passport from 'passport'
var User = require('./models/User')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
})
router.get("/", (req, res, next) => {
  User.find()
  .sort({ createdAt: "descending" })
  .exec((err, users) => {
    if (err) { return next(err); }
    res.render("users", { users: users });
  })
})

router.get("/signup", (req, res) => {
  res.render("signup");
})

// Signup ======================================================================
// Saves user to the database
router.post("/signup", (req, res, next) => {
  // body-parser adds the username and password to req.body
  const username = req.body.username
  const password = req.body.password

  // Calls findOne to return just one user. You want a match on usernames here
  User.findOne({ username: username }, (err, user) => {
    if (err) { return next(err) }
    if (user) {
      req.flash("error", "User already exists")
      return res.redirect("/auth/signup")
    }
    const newUser = new User({
      username: username,
      password: password
    })
    // Saves the new user to the database and continues to the next request handler
    newUser.save(next)
  })
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/auth/signup",
  failureFlash: true
}))

router.get("/users/:username", (req, res, next) => {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return next(404); }
    res.render("profile", { user: user });
  })
})

module.exports = router;

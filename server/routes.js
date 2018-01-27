import express from 'express'
import passport from 'passport'
var User = require('./models/User')

const router = express.Router()

// Passing data to views
// Passport populates req.user for you
router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
})

// returns all the users, newest one first
router.get("/", (req, res, next) => {
  User.find()
  .sort({ createdAt: "descending" })
  .exec((err, users) => {
    if (err) { return next(err); }
    res.render("users", { users: users });
  })
})

router.get("/users/:username", (req, res, next) => {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return next(404); }
    res.render("profile", { user: user });
  })
})


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    req.flash("info", "You must be logged in to see this page.")
    res.redirect("/auth/login")
  }
}

// Signup ======================================================================
// Saves user to the database
router.get("/signup", (req, res) => {
  res.render("signup");
})

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
  successRedirect: "/auth",
  failureRedirect: "/auth/signup",
  failureFlash: true
}))

// Login ======================================================================
//

router.get("/login", (req, res) => {
  res.render("login");
})

router.post("/login", passport.authenticate("login", {
  successRedirect: "/auth",
   failureRedirect: "/auth/login",
  failureFlash: true
}))

// Logout ======================================================================
// Passport populates req.user for you
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth");
});

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
})

// edit ======================================================================
// Passport populates req.user for you
router.get("/edit", ensureAuthenticated, (req, res) => {
  res.render("edit")
})

router.post("/edit", ensureAuthenticated, (req, res, next) => {
  req.user.displayName = req.body.displayname
  req.user.bio = req.body.bio
  req.user.save((err) => {
    if (err) {
      next(err)
      return
    }
    req.flash("info", "Profile updated!")
    res.redirect("/auth/edit")
  })
})


module.exports = router;

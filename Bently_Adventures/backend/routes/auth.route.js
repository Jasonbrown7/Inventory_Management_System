const { Router } = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const router = new Router();

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const foundUser = await User.findOne({ username: username });
      if (!foundUser) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      foundUser.validatePassword(password, cb);
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser(function (user, cb) {
  console.log(user);
  process.nextTick(function () {
    cb(null, { id: user._id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.route('/login/fail').get((req, res, next) => {

  res.status(400).send('LOGIN FAIL.');
})

router.route('/login/success').get((req, res, next) => {

  res.status(200).send('LOGIN SUCCESSFUL.');
})

router.post(
  "/login/password",
  passport.authenticate("local", {
     successRedirect: "success",
     failureRedirect: "fail",
  })
);

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

const authMiddleware = (req, res, next) => {

  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated')
  } else {
    return next()
  }
}
router.get("/user", authMiddleware, (req, res) => {
  
  console.log(req.user);

})

module.exports = router;

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
    cb(null, { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin, pic: user.pic});
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.route('/login/fail').get((req, res, next) => {
  console.log(req);
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
    if (err) { console.log(err); return next(); }
    res.status(200).send("LOG OUT SUCCESSFUL.");
  });
});

const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("Failed Authentication Check.")
  } else {
    return next()
  }
}
const adminMiddleware = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin === true) {
    return next()
  } else {
    res.status(401).send("Failed Admin Check.")
  
  }
}

router.get("/admin", adminMiddleware, (req, res) => {
  
  res.status(200).send({user: req.user});
})

router.get("/user", authMiddleware, (req, res) => {
  
  res.status(200).send({user: req.user});
})

module.exports = router;

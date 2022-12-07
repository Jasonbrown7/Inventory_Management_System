const { Router } = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
let User = require('../models/User')
const router = new Router();

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
   });

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const foundUser = await User.findOne({username: username});
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




router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    // successRedirect: "http://localhost:8080/view",
    // failureRedirect: "http://localhost:8080/login",
  }),
);

module.exports = router;

// const express = require('express')
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// let User = require('../models/User')
// const authRoute = express.Router()


// passport.use(
//   new LocalStrategy(async function verify(username, password, cb) {
//     try {
//       const foundUser = await User.findOne({username: username});
//       if (!foundUser) {
//         return cb(null, false, { message: "Incorrect username or password." });
//       }
//       foundUser.validatePassword(password, cb);
//     } catch (err) {
//       return cb(err);
      
//     }
//   })
// );

// passport.serializeUser(function (user, cb) {
//   console.log(user);
//   process.nextTick(function () {
//     cb(null, { id: user._id, username: user.username });
//   });
// });

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });

// authRoute.route('/login/fail').get((req, res, next) => {
//   //console.log(req.session.user);
//   res.status(400).send('LOGIN FAIL.');
// })

// authRoute.route('/login/success').get((req, res, next) => {
//   //console.log(req.session);
//   res.status(200).send('LOGIN SUCCESSFUL.');
// })


// authRoute.post(
//   "/login/password",
//   passport.authenticate("local", {
//     successRedirect: "/login/success",
//     failureRedirect: "/login/fail",
//   }),
// );

// const authMiddleware = (req, res, next) => {
//   //console.log(req);
//   if (!req.isAuthenticated()) {
//     res.status(401).send('You are not authenticated')
//   } else {
//     return next()
//   }
// }
// authRoute.get("/user", authMiddleware, (req, res) => {
  
//   //console.log(req.session.passport);
  

//   //console.log([user, req.session])

//   //res.send({ user: user })
// })

// module.exports = authRoute;
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
  //console.log(req.session.user);
  res.status(400).send('LOGIN FAIL.');
})

router.route('/login/success').get((req, res, next) => {
  //console.log(req.session);
  //console.log("insucess",req);
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
  //console.log(req);
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

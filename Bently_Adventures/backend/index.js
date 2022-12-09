// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const app = express();
// const MongoStore = require("connect-mongo");
// var passport = require("passport");
// const createError = require('http-errors');
// const authAPI = require('./routes/auth.route')
// const userAPI = require('./routes/user.route')
// var session = require("express-session");

// app.use(cors())
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {secure: false},
//     store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/mydatabase"}),
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());


// app.use(express.static("public"), express.static("dist"));
// // Connect mongoDB
// mongoose
//   .connect('mongodb://127.0.0.1:27017/mydatabase')
//   .then((x) => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch((err) => {
//     console.error('Error connecting to mongo', err.reason)
//   })





// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({extended: false}),
//   bodyParser.json({ extended: false })
// )


// // API

// app.use('/api', userAPI)
// app.use(authAPI)
// app.use('/api/auth', authAPI)


// // Create port
// const port = process.env.PORT || 4000
// const server = app.listen(port, () => {
//   console.log('Connected to port ' + port)
// })

// // Find 404
// app.use((req, res, next) => {
//   next(createError(404))
// })

// // error handler
// app.use(function (err, req, res, next) {
//   console.error(err.message)
//   if (!err.statusCode) err.statusCode = 500
//   res.status(err.statusCode).send(err.message)
// })
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const apiRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const mongoose = require("mongoose");
const cors = require('cors');
var session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
if (process.env.MODE == "production") {
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: `mongodb://nic:${process.env.MONGO_PASSWORD}@192.168.171.67:27017/nic?authSource=admin`,
      }),
    })
  );
} else {
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/mydatabase" }),
    })
  );
}
app.use(passport.initialize());
app.use(passport.session());

const aLoggerMiddleware = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
app.use(aLoggerMiddleware);
app.use(
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json({ extended: false })
);

app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);
app.use(express.static("public"), express.static("dist"));

async function main() {
  if (process.env.MODE == "production") {
    await mongoose.connect(`mongodb://192.168.171.67:27017/nic`, {
      useNewUrlParser: true,
      authSource: "admin",
      user: "nic",
      pass: process.env.MONGO_PASSWORD,
    });
  } else {
    await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
  }
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main().catch((err) => console.error(err));



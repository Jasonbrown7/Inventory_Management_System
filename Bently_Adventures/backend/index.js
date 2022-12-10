const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const itemRoutes = require("./routes/item.route");
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

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/item', itemRoutes)
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



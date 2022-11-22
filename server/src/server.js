require("dotenv").config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieSession = require('cookie-session');
const logger = require("morgan");
const passportSetup = require("./config/passport");
const authRoute = require("./routes/auth");
require("./db/dbConnect");
const app = express();

app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.MONGO_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION_URL,
      ttl: 12 * 60 * 60
    }),
  })
);
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["bfs"],
//     maxAge: 24 * 60 * 60 * 100
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  })
);

app.use(logger("dev"));
// app.use(express.json);
// app.use(express.urlencoded({extended: false}));
app.use("/auth", authRoute);
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
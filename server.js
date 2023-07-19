//default packages
const express = require("express");
const dotenv = require("dotenv").config();
const session = require("express-session");
const mongosession = require("connect-mongodb-session")(session);
const methodOverride = require("method-override");
const cookieparser = require("cookie-parser");

//user defined modules
const dbconnect = require("./dbconnections/dbconnection");
const login = require("./routes/login");
const dashboard = require("./routes/dashboard");
const incomehead = require("./routes/incomehead");
const expensehead = require("./routes/expensehead");
const dailyincome = require("./routes/dailyincome");
const dailyexpenditure = require("./routes/dailyexpenditure");
const dailydisplay = require("./routes/dailydisplay");
const monthlydisplay = require("./routes/monthlydisplay");
const sortmonthlydisplay = require("./routes/sortmonthlydisplay");
const betweendisplay = require("./routes/betweendisplay");

//env path variables
port = process.env.PORT || 3001;
dburl = process.env.DBURL;

//dbconnection
dbconnect(dburl);

const app = express();

//middleware
app.use(methodOverride("_method"));
app.use(cookieparser());
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//template engine
app.set("view engine", "ejs");
app.set("views", "views");

//middleware
const store = new mongosession({
  uri: dburl,
  collection: "mysession",
});
app.use(
  session({
    key: "thisiskey",
    secret: "THISISSECRET",
    saveUninitialized: false,
    resave: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
    },
    store: store,
  })
);
const isAuth = (req, res, next) => {
  if (req.session && req.session.isAuth) {
    res.redirect("/dashboard");
  } else {
    if (req.url !== "/login") {
      res.redirect("/login");
    } else {
      next();
    }
  }
};

//default redirect login route
app.get("/", isAuth, (req, res) => {
  res.redirect("/login");
});

//define routes
app.use("/", login);
app.use("/dashboard", dashboard);
app.use("/incomehead", incomehead);
app.use("/expensehead", expensehead);
app.use("/dailyincome", dailyincome);
app.use("/dailyexpenditure", dailyexpenditure);
app.use("/dailydisplay", dailydisplay);
app.use("/monthlydisplay", monthlydisplay);
app.use("/sortmonthlydisplay", sortmonthlydisplay);
app.use("/betweendisplay", betweendisplay);

//server listening
app.listen(port, () => {
  console.log("server running at port", port);
});

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

const passport = require("passport");
const googleRoute = require("./routes/googles.js");
const session = require('express-session');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

app.set('view engine', 'ejs');

// Set the directory where the template files are located
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get("/login", (req,res)=>{
  res.render("login.ejs");
});

app.get("/signup", (req,res)=>{
  res.render("signup.ejs");
});

const sessionOptions = {
  secret: 'keyboard cat', // Replace 'yourSecretKey' with a secret key of your choice
  resave: false, // Set to false to avoid resaving session if it wasn't modified
  saveUninitialized: true, // Set to true to save uninitialized sessions
  cookie: { 
    maxAge: 60000, // Session expiration time in milliseconds (e.g., 60000 ms = 1 minute)
    secure: false // Set to true if using HTTPS
  }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function(user,done){
  done(null,user);
});

passport.deserializeUser(function(user,done){
  done(null,user);
});


function requireLogin(req, res, next) {
  if (req.session.userId) {
      next(); // User is logged in, proceed to the next middleware
  } else {
      res.redirect('/login'); // Redirect to login page if not logged in
  }
}

// --- Google oauth ---

app.use('/auth/google', googleRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
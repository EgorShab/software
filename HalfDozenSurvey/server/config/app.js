// Installed 3rd party packages
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

//modules for authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const flash = require('connect-flash');

// database setup
const mongoose = require('mongoose');
const DB = require('./db');

// point mongoose to the DB URI
mongoose.connect(DB.URI);

const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.on('open', () => console.log('Connected to MongoDB...'));

const indexRouter = require('../routes/index');
const surveyTemplateRouter = require('../routes/surveyTemplate');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // express -e

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}))

//initialize flash 
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//create the User model instance
let userModel = require('../models/user');
let User = userModel.User;

//implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserilaize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));
app.use(cors());

app.use('/api/', indexRouter);
app.use('/api/survey', surveyTemplateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;

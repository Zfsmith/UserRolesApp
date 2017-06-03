//Server Dependencies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var logger = require("morgan");

//Create Express app
var app = express();
var PORT = process.env.PORT || 8080;

//Mongo Config
mongoose.connect('mongodb://localhost/finalproj')
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//Routes
//var routes = require('./routes/index');
var user = require('./routes/user');

//Schemas
var User = require("./models/user");

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());

app.use(express.static("./public"));

//Express Sessions
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Connect Flash
app.use(flash());

//Global Flash Vars
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  console.log(req.user + " here");
	next();
});

//app.use('*', routes);
app.use('/users', user);

//send all to react
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html", {user: "zach"});
});



//Start Server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

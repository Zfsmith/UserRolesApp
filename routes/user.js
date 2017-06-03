var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require("../models/user")
//user routes


router.post('/register', function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var userName = req.body.userName;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.checkBody('firstName', 'First Name is required').notEmpty();
  req.checkBody('lastName', 'Last Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('userName', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    res.send(errors);
  } else {
    var newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: userName,
      password: password
    });
    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    //req.flash('success_msg', 'You are registered and can now login');

    res.send(true);
  }
  console.log(firstName);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        console.log("not user");
        return done(null, false, {message:  'Unknown User'});
      }
      console.log("user yes");
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          console.log("pass yes");
          return done(null, user);
        } else{
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {failureRedirect:'/login'}),
  function(req, res) {
    console.log(req.user.firstName);
    //res.redirect('/');
    res.send(req.user);
});

router.get('/',function(req, res){
  res.send(res.locals.user);
  //console.log(res.locals.user);
});

router.get('/logout',function(req, res){
  req.session.destroy(function (err) {
      
    });
  console.log('loggingout');
});

// router.post('/login', function(req, res, next) {
//   console.log('beforeauth');
//   passport.authenticate('local', function(err, user, info) {
//     console.log('afterauth');
//     if (err) {
//       return next(err);
//     }
//     //console.log("get");
//     if (!user) {
//       res.send("fail")
//       //console.log("get1");
//       //return res.redirect('/login');
//     }
//     req.logIn(user, function(err) {
//       if (err) {
//         return next(err);
//       }
//       //console.log("get2");
//       res.send("suc");
//
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });

module.exports = router;

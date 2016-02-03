var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Ebay = require('ebay');
var aws = require('aws-sdk');



var session = require('cookie-session');
require('dotenv').load();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
var knex = require('./db/knex')

function User(){
  return knex('users')
}

var routes = require('./routes/index');
var users = require('./routes/users');
var ventures = require('./routes/ventures');
var auth = require('./routes/auth');
var comments = require('./routes/comments');
var kits = require('./routes/kits')
var bins = require('./routes/bins')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({keys:[process.env.SESSION_KEY1, process.env.SESSION_KEY2]}))

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET


app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback/",
  enableProof: false
},
  function(accessToken, refreshToken, profile, done){
    console.log(profile)
    User().select().where('fb_id', profile.id).then(function(fbUser){
      if (fbUser.length){
        console.log("in the if")
        console.log(fbUser);
        return done(null, fbUser)
      } else {
        console.log("in the else");
        var obj = {
          fb_id: profile.id,
          username: profile.displayName.slice(0, profile.displayName.indexOf(' '))
        }
        console.log('obj is: ' + obj.username)
        User().insert(obj).then(function(facebook){
            return done(null, obj)
          })

      }
    })
    })
)
passport.serializeUser(function(user, done){
  done(null, user)
})
passport.deserializeUser(function(user, done){
  done(null, user)
})

app.use('/', routes);


app.use('/', users);
app.use('/auth', auth);
app.use('/ventures', ventures);
app.use('/ventures', bins);
app.use('/', kits);
app.use('/ventures', comments);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.get('/ventures/:ven_id/bins/pic', function(req, res){
  res.render('bins/pic');
});

app.post('/submit_form', function(req, res){
    username = req.body.username;
    full_name = req.body.full_name;
    avatar_url = req.body.avatar_url;
    update_account(username, full_name, avatar_url); // TODO: create this function
    // TODO: Return something useful or redirect
    });

module.exports = app;

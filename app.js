var express = require('express');
var http = require('http');
var passport = require('passport');
var util = require('util');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var api_keys = require(__dirname + '/config/keys');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'cmuis272' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
require('./config/routes')(app);
app.use(express.logger());
app.use(express.methodOverride());

// API keys and such
var LINKEDIN_API_KEY = api_keys.api_key;
var LINKEDIN_SECRET_KEY = api_keys.secret_key;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:3000/auth/linkedin/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

console.log('listening on port 3000');
app.listen(3000);
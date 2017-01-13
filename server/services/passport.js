const GITHUB_CLIENT_ID = require('../config').GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = require('../config').GITHUB_CLIENT_SECRET;
const passport = require('passport');
const User = require('../models/user');
const GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3090/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {

    User.findOrCreate(profile, function (err, user) {
      return cb(err, {userFromDb: user, accessToken });
    });
  }
));

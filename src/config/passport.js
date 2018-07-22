const passport = require('passport');
const localStrategy = require('./strategies/local.strategies');
const googleStrategy = require('./strategies/google.strategies');
const facebookStrategy = require('./strategies/facebook.strategies');

// load up the user model
const User = require('../models/userModel');
// require('./strategies/local.strategies')();

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Retrives user from session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-register', localStrategy.register);
  passport.use('local-login', localStrategy.login);
  passport.use('facebook', facebookStrategy.authentication);
  passport.use('google', googleStrategy.authentication);
};

const express = require('express');
const passport = require('passport');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================
// locally ---------------------------------------------------------------------
// LOGIN =======================================================================
authRouter.get('/', (req, res) => {
  //  debug('inside logintest');
  res.send('hi');
});
authRouter.post('/login', passport.authenticate('local-login'), (req, res) => {
  debug(req.user.local.email);
  res.send(req.user);
});

// SIGNUP =================================
authRouter.post('/register', passport.authenticate('local-register'), (req, res) => {
  debug('created a user');
  res.send(req.user.email);
});

// facebook -------------------------------
// send to facebook to do the authentication
authRouter.route('/facebook')
  .get(passport.authenticate('facebook', {
    scope: ['email'],
  }));
// handle the callback after facebook has authenticated the user
authRouter.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/index/',
    failureRedirect: '/error/',
  }));
// google ---------------------------------
// send to google to do the authentication
authRouter.route('/google')
  .get(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'],
  }));
// the callback after google has authenticated the user
authRouter.route('/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/home',
    failure: '/error/',
  }));
// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) { return next(); }

  // if they aren't redirect them to the home page
  res.redirect('/');
}
module.exports = authRouter;

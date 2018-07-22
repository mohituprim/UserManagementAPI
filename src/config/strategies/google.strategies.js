const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const user = require('../../models/userAccountModel');
const debug = require('debug')('app:authRoutes');

exports.authentication = new GoogleStrategy(
  {
    clientID: '588635262879-s7siql3nrq5krv8e805qums5ilev4eiq.apps.googleusercontent.com',
    clientSecret: 'VkS3rYskuHh4abbv3iY9qucH',
    callbackURL: 'http://localhost:4000/auth/google/callback',
    passReqToCallback: true,
  },
  ((req, accessToken, refreshToken, profile, done) => {
    // user.google.email = profile.emails[0].value;
    // // user.google.image = profile._json.image.url;
    // user.google.name = profile.displayName;

    // user.google = {};
    // user.google.id = profile.id;
    // user.google.token = accessToken;
    debug('inside callback');
    done(null, profile);
  }),
);

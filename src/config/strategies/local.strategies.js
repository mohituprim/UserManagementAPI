const UserAccount = require('../../models/userAccountModel');
const debug = require('debug')('app:localStrat');
const LocalStrategy = require('passport-local').Strategy;

const logInStrategyOptions = {
  usernameField: 'email',
};

exports.login = new LocalStrategy(logInStrategyOptions, ((email, password, done) => {
  const searchUser = {
    'local.email': email,
  };
  debug('local');
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  UserAccount.findOne(searchUser, (err, user) => {
    if (err) return done(err);

    // if no user is found, return the message
    if (!user) {
      return done(null, false, {
        message: 'Wrong email/password',
      });
    }

    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Wrong email/password',
      });
    }

    return done(null, user);
  });
}));

exports.register = new LocalStrategy({ usernameField: 'email' }, ((email, password, done) => {
  const searchUser = {
    'local.email': email,
  };
  UserAccount.findOne(searchUser, (err, user) => {
    if (err) return done(err);

    // check to see if theres already a user with that email
    if (user) {
      return done(null, false, {
        message: 'email already exists',
      });
    }

    // if there is no user with that email
    // create the user
    const newUser = new UserAccount();
    newUser.local.email = email;
    newUser.local.password = newUser.generateHash(password);
    newUser.intializeAccount(newUser);
    newUser.save(err => done(null, newUser));
    return newUser.local.email;
  });
}));

const express = require('express');
const debug = require('debug')('app:adminRoutes');

const userRouter = express.Router();

// userRouter.use('/', (req, res, next) => {
//   debug('inside user');
//   res.redirect('/');
//   // if (!req.user) {
//   //   res.redirect('/');
//   // }
//   next();
// });
/* GET users listing. */
userRouter.get('/#', (req, res) => {
  debug('inside user');
  res.render('users');
});

module.exports = userRouter;

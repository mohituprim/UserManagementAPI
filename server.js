
// eslint-disable-line global-require
// https://frontendmasters.com/books/front-end-handbook/2018/tools/ui.html
const express = require('express');
const chalk = require('chalk'); // to beautify the messages Terminal string styling done right debug = require('debug')('app'), // to manage loogin while debugging
const morgan = require('morgan'); // HTTP request logger middleware for node.js
const path = require('path'); // to manage path
const debug = require('debug')('app');
const bodyParser = require('body-parser'); // Parse the body of form and put it to the req.body
// const passport = require('passport'); // Passport is Express-compatible authentication middleware for Node.js.
const cookieParser = require('cookie-parser'); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
const session = require('express-session'); // Session middleware for express
const mongoose = require('mongoose');
const config = require('./src/config/config');
const router = require('./src/routes/routes');
// const passport = require('./src/config/passport');

const app = express();
const port = process.env.PORT || 5000;


class Server {
  constructor() {
    this.initViewEngine();
    this.initExpressMiddleWare();
    this.initCustomMiddleware();
    this.initDbSeeder();
    this.initRoutes();
  }

  start() {
    app.listen(port, () => {
      debug(`running server on port ${chalk.green(port)}`);
    });
  }

  initViewEngine() {
    app.set('view engine', 'ejs'); // set up ejs for templating
    app.set('views', path.join(__dirname, './src/views'));
  }

  initExpressMiddleWare() {
    // app.use(morgan('combined'));
    app.use(morgan('tiny'));
    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({ secret: 'user management' }));


    // express.static will serve everything with in public as a static resource
    // also it will serve the index.html on the root of that directory on a GET to '/'
    app.use(express.static(path.join(__dirname, '/views')));

    app.use(cookieParser()); // read cookies (needed for auth)
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
    require('./src/config/passport')(app);
  }

  initCustomMiddleware() {
    if (process.platform === 'win32') {
      require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
      }).on('SIGINT', () => {
        debug('SIGINT: Closing MongoDB connection');
        // database.close();
      });
    }

    process.on('SIGINT', () => {
      debug('SIGINT: Closing MongoDB connection');
      // database.close();
    });
  }

  initDbSeeder() {
    mongoose.connect(config.DB_ConnectionString);
  }

  initRoutes() {
    router.load(app);
    app.all('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'views/index.html'));
    });
    // / catch 404 and forwarding to error handler
    app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // / error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err,
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
      });
    });
  }
}
module.exports = app;
const server = new Server();
server.start();

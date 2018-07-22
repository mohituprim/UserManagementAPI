const userRouter = require('../../src/routes/userRoutes');
const authRouter = require('../../src/routes/authRoutes');

class Router {
  constructor() {
    this.startFolder = null;
  }

  // Called once during initial server startup
  load(app) {
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
  }
}
module.exports = new Router();
